const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
var config = require('./config')

var auth = config.mailer

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

const options={
    requestCert: true, //This will request the client certificate
    rejectUnauthorized: false, //This will reject client certificates that are not signed by the CA
    key:fs.readFileSync(path.join(__dirname+'/keys/key.pem')),
    cert:fs.readFileSync(path.join(__dirname+'/keys/cert.pem')),
    dhparam:fs.readFileSync(path.join(__dirname+'/keys/dh-strong.pem')),
    ca: [
          fs.readFileSync(path.join(__dirname+'/keys/COMODORSADomainValidationSecureServerCA.crt')),
          fs.readFileSync(path.join(__dirname+'/keys/COMODORSAAddTrustCA.crt'))
       ]
}

const port = 80
const sslport=443

const app=express()
app.use(helmet())
app.listen(port)
https.createServer(options,app).listen(sslport)

var stakes=["Annapolis","Baltimore","Columbia","Frederick","Seneca","Silver Spring","Suitland","Washington, DC","Altoona","Chambersburg","Pitsburgh","Annandale","Ashburn","Buena Vista(YSA)","Centreville","Chesapeake","Fredricksburg","Gainesville","McLean","Mt Vernon","Newport News","Oakton","Pembroke","Richmond-Chesterfield","Richmond-Midlothian","Richmond","Roanoke","Stafford","Virginia Beach","Washington DC(YSA)","Winchester","Waynesboro","Woodbridge","Clarksburg","Martinsburg"];
var temples=['Philadelphia','Columbus','Manhattan']

var MongoClient=require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url="mongodb://localhost:27017/templeCarpoolDB";
var db;

MongoClient.connect(url,function(err,host){
    if(err) throw err;
    db=host.db('templeCarpoolDB')
})

//see https://www.npmjs.com/package/cron
var CronJob=require('cron').CronJob;
/*var testEmail=new CronJob('0 11 0 * * *',function(){
    var today=new Date();
    console.log(today.toLocaleString())
    sendEmail('epper.marshall@gmail.com','test node','node fun')
})
testEmail.start()*/
var cleanUp=new CronJob('0 0 5 * * *',function(){
    var yesterday=new Date();
    //console.log(yesterday.getHours())
    yesterday.setDate(yesterday.getDate()-1);
    console.log((new Date()).toLocaleString()+': should remove any trip that has a return date <= yesterday')
    var cursor=db.collection('Trips').find({}).toArray(function(err, results) {
        if(err){
            res.status(500).send('Some error:'+err)
            return;
        }
        var removeTrips=[]
        results.forEach(function(obj,index){
            var date=new Date(obj['rDate'])
            if(date<=yesterday){
                removeTrips.push(obj['_id'])
            }
        })
        //console.log('removing trips: '+JSON.stringify(removeTrips))
        db.collection('Trips').deleteMany({_id: { $in: removeTrips }})
    })
});
cleanUp.start()

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//get all trips
app.get('/api/trips',function(req,res){
    var cursor=db.collection('Trips').find().toArray(function(err, results) {
        //console.log(results)
        res.send(results)
    })
})

//get email preferences
app.get('/api/users/emailPrefs/:email',function(req,res){
    var cursor=db.collection('Users').find({'email':req.params.email}).toArray(function(err, results) {
        //console.log(results)
        res.send(results)
    })
})

//post email preferences
app.post('/api/users/emailPrefs/:email',function(req,res){
    console.log('saving pref:'+JSON.stringify(req.body));

    db.collection('Users').replaceOne({'email':req.params.email},{$set:(req.body)},{upsert: true},function(err,result){
        if(err){
            res.status(500).send('Some error:'+err)
            return
        }
        console.log('updated preferences')
        res.send('Updated your preferences')
    })
})

//create a trip
app.post('/api/trips/add',function(req,res){
    console.log('adding trip:'+JSON.stringify(req.body));
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
    //verify body
    var keys=Object.keys(req.body);
    //check number of keys
    if(keys.length!=11){
        res.send('You have sent the wrong amount of information '+keys.length);
        return;
    }
    //check key names
    if(keys.indexOf('driver')<0||keys.indexOf('email')<0||keys.indexOf('dDate')<0||
        keys.indexOf('dTime')<0||keys.indexOf('rDate')<0||keys.indexOf('rTime')<0||
        keys.indexOf('numSeats')<0||keys.indexOf('departStake')<0||keys.indexOf('templeDest')<0||
        keys.indexOf('comments')<0||keys.indexOf('splitCost')<0){
        res.send('You have sent the wrong kind of information');
        return;
    }
    //check some values
    if(req.body.email.indexOf('@')<0){
        res.send('You need a valid email');
        return;
    }
    if(req.body.numSeats<1){
        res.send('You need at least 1 seat');
        return;
    }
    /*console.log('driver:'+req.body.driver)
    console.log('email:'+req.body.email)
    console.log('depD:'+req.body.dDate)
    console.log('depT:'+req.body.dTime)
    console.log('retD:'+req.body.rDate)
    console.log('retT:'+req.body.rTime)
    console.log('seat:'+req.body.numSeats)
    console.log('stake:'+departStake)
    console.log('temple:'+templeDest)
    console.log('split:'+req.body.splitCost)
    console.log('comment:'+req.body.comment)*/
    //check if driver has trip with same return or depart date
    var dquery={dDate:req.body.dDate, email:req.body.email};
    var rquery={rDate:req.body.rDate, email:req.body.email};
    db.collection('Trips').find({$or:[dquery,rquery]}).toArray(function(err, results) {
        if(err){
            res.status(500).send('Some error:'+err)
            return;
        } 
        console.log('depart query results:'+JSON.stringify(results))
        console.log(results=='')
        if(results!=''){
            console.log('add error')
            if(req.body.dDate==results[0]['dDate']){
                res.send('You already have scheduled depart trip on '+req.body.dDate)
            }else{
                res.send('You already have scheduled return trip on '+req.body.rDate)
            }
            //res.status(500).send('You already have scheduled trip on '+req.body.dDate+' or '+req.body.rDate)
        }else{
            db.collection('Trips').save(req.body,(err,result)=>{
                if(err) return console.log('An error: '+err)

                console.log('saved trip to db')
                //email when you create trip
                checkEmailPref(req.body.email,'createATrip').then(function(shouldEmail){
                    if(shouldEmail){
                        console.log('should send')
                        sendEmail(req.body.email,'You have created a trip from '+req.body.dDate+'-'+req.body.rDate+'. Please visit templecarpool.com to change your email preferences or to modify your Trip.')
                    }else{
                        console.log('should not send')
                    }
                })
                /*var shouldEmail=checkEmailPref(req.body.email,'createATrip')
                if(shouldEmail){
                    console.log('should send')
                    sendEmail(req.body.email,'You have created a trip from '+req.body.dDate+'-'+req.body.rDate+'. Please visit templecarpool.com to change your email preferences or to modify your Trip.')
                }else{
                    console.log('should not send')
                }*/
            })
            //res.redirect('/')
            res.send('Your ride has been posted')
        }
    })
})

//reserve a seat for a trip
app.post('/api/trips/:trip',function(req,res){
    console.log('trip param:'+req.params.trip)
    console.log('passenger:'+JSON.stringify(req.body))
    //verify body
    var keys=Object.keys(req.body);
    //check number of keys
    if(keys.length!=2){
        res.send('You have sent the wrong amount of information '+keys.length);
        return;
    }
    //check key names
    if(keys.indexOf('name')<0||keys.indexOf('email')<0){
        res.send('You have sent the wrong kind of information');
        return;
    }
    //check some values
    if(req.body.email.indexOf('@')<0){
        res.send('You need a valid email');
        return;
    }
    //check if passenger has a seat 
    var pquery={'_id':ObjectId(req.params.trip),passengers:{$elemMatch:{'name':req.body.name,'email':req.body.email}}};
    //check if trip is full
    var t={}
    db.collection('Trips').find({'_id':ObjectId(req.params.trip)}).toArray(function(err,result){
        var trip=result[0];
        //console.log('trip:'+JSON.stringify(trip))
        //console.log('passengers' in trip)
        var passLen='passengers' in trip?trip['passengers'].length:0;
        
        t['$size']=parseInt(trip['numSeats'])
        //console.log('t:'+JSON.stringify(t))
        var fquery={'_id':ObjectId(req.params.trip),'passengers':t};
        //check if you're the driver
        var name='';
        
        var dquery={'_id':ObjectId(req.params.trip),'email':req.body.email};
        console.log('queries: '+JSON.stringify(pquery)+','+JSON.stringify(fquery)+','+JSON.stringify(dquery))
        var cursor=db.collection('Trips').find({$or:[pquery,fquery,dquery]}).toArray(function(err, results) {
            if(err){
                console.log('some error 501')
                res.status(500).send('Some error:'+err)
                return;
            } 
            //console.log('reserve query results:'+JSON.stringify(results))
            //console.log(results=='')
            if(results!=''){
                console.log('reserve error')
                //console.log(name+' equal '+results[0]['driver']+' - '+(name==results[0]['driver']).toString())
                //console.log(req.params.passenger+' in '+JSON.stringify(results[0]['passengers'])+' - '+('passengers' in results[0] && results[0]['passengers'].indexOf(req.params.passenger)>-1).toString())
                if(req.body.email==results[0]['email']){
                    console.log('you\'re the driver')
                    res.send('You\'re the driver')
                }
                else if(passLen==results[0]['numSeats']){
                    console.log('no more seats')
                    res.send('There are no more available seats')
                }
                else{
                    console.log('already have a seat')
                    res.send('You already have a seat reserved')
                }
            }else{
                db.collection('Trips').update({'_id':ObjectId(req.params.trip)},{ $push: { "passengers": req.body }},function(err,res){
                    if(err) throw err

                    console.log('reserved seat on trip ');
                    //check if joining passenger gets email
                    /*var shouldEmail=checkEmailPref(trip.email,'passJoin');
                    if(shouldEmail)
                        sendEmail(trip.email,'You have joined a trip from '+req.body.dDate+'-'+req.body.rDate+'. Please visit templecarpool.com to change your email preferences or to leave the Trip.')
                    //check if driver gets email
                    shouldEmail=checkEmailPref(req.body.email,'joinTrip');
                    if(shouldEmail)
                        sendEmail(req.body.email,'A passenger has joined your trip from '+req.body.dDate+'-'+req.body.rDate+'. Please visit templecarpool.com to change your email preferences or to modify your Trip.')
                    */
                })
                res.send('Your seat has been reservd')
            }
        })
    })
})

//update a trip as driver
app.post('/api/trips/edit/:trip',function(req,res){
    console.log('trip:'+req.params.trip)
    
    console.log('driver:'+req.body.departStake)
    console.log('driver:'+req.body.templeDest)
    console.log('depD:'+req.body.dDate)
    console.log('depT:'+req.body.dTime)
    console.log('retD:'+req.body.rDate)
    console.log('retT:'+req.body.rTime)
    console.log('seat:'+req.body.numSeats)
    console.log('split:'+req.body.splitCost)
    console.log('comment:'+req.body.comment)
    //verify body
    var keys=Object.keys(req.body);
    //check number of keys
    if(keys.length!=9){
        res.send('You have sent the wrong amount of information '+keys.length);
        return;
    }
    //check key names
    if(keys.indexOf('dDate')<0||keys.indexOf('dTime')<0||keys.indexOf('rDate')<0||keys.indexOf('rTime')<0||
        keys.indexOf('numSeats')<0||keys.indexOf('departStake')<0||keys.indexOf('templeDest')<0||
        keys.indexOf('comments')<0||keys.indexOf('splitCost')<0){
        res.send('You have sent the wrong kind of information');
        return;
    }
    //check some values
    if(req.body.numSeats<1){
        res.send('You need at least 1 seat');
        return;
    }
    db.collection('Trips').update({'_id':ObjectId(req.params.trip)},{$set:(req.body)},function(err,result){
        if(err){
            res.status(500).send('Some error:'+err)
            return
        }
        console.log('updated trip')
        //check if driver gets email
        //var shouldEmail=checkEmailPref(req.body.email,'joinTrip');
        //if(shouldEmail)
        //    sendEmail(req.body.email,'A passenger has joined your trip from '+req.body.dDate+'-'+req.body.rDate+'. Please visit templecarpool.com to change your email preferences or to modify your Trip.')
        //check passengers
        db.collection('Trips').find({'_id':ObjectId(req.params.trip)}).toArray(function(error, trip) {
            if (error) throw error;
            //console.log(JSON.stringify(trip))
            if('passengers' in trip[0] && trip[0].passengers.length>0){
                for(var i=0;i<trip[0].passengers.length;i++){
                    /*shouldEmail=checkEmailPref(trip[0].passengers.email,'tripModified');
                    if(shouldEmail)
                        sendEmail(trip[0].passengers.email,'The driver has modified your trip from '+req.body.dDate+'-'+req.body.rDate+'. Please visit templecarpool.com to change your email preferences or to see the Trip changes.')*/
                }
            }
        })
        res.send('Updated your trip')
    })
})

//remove a trip with ID
app.delete('/api/trips/:trip',function(req,res){
    console.log('deleting trip:'+req.params.trip)
    //res.send('remove ride received')
    //grab passengers of trip
    var passengers=[];
    var yourEmail='';
    db.collection('Trips').find({'_id':ObjectId(req.params.trip)}).toArray(function(error, trip) {
        if (error) throw error;

        yourEmail=trip[0].email;
        if('passengers' in trip[0]){
            passengers=trip[0].passengers;
        }
    })
    db.collection('Trips').deleteOne({'_id':ObjectId(req.params.trip)},function(err,result){
        if(err){
            res.status(500).send('Some error:'+err)
            return;
        }
        console.log('deleted trip')
        //check if driver gets email
        /*var shouldEmail=checkEmailPref(yourEmail,'deleteTrip');
        if(shouldEmail)
            sendEmail(yourEmail,'You have deleted your trip scheduled on '+req.body.dDate+'-'+req.body.rDate+'. Please visit templecarpool.com to change your email preferences or to create a new Trip.')*/
        //check if should email passengers
        for(var i=0;i<passengers.length;i++){
            /*shouldEmail=checkEmailPref(passengers.email,'tripDeleted');
            if(shouldEmail)
                sendEmail(passengers.email,'The driver has deleted the trip you had a seat scheduled on '+req.body.dDate+'-'+req.body.rDate+'. Please visit templecarpool.com to change your email preferences or to find a new Trip.')*/
        }
        res.send('The trip has been deleted')
    })
})
//remove a passenger from a trip
app.delete('/api/trips/:trip/:email',function(req,res){
    console.log('drop trip:'+req.params.trip)
    console.log('drop email:'+req.params.email)
    //TODO check that passenger is a passenger for said trip?
    db.collection('Trips').update({'_id':ObjectId(req.params.trip)},{ $pull: { 'passengers': {'email':req.params.email}} },function(err, results) {
        if (err) throw err;
        console.log('You have kicked a passenger/cancelled your seat')
        //check if driver gets email
        /*var shouldEmail=checkEmailPref(req.params.email,'kickFromTrip');
        if(shouldEmail)
            sendEmail(req.params.email,'You have dropped as a passenger for the trip scheduled on '+req.body.dDate+'-'+req.body.rDate+'. Please visit templecarpool.com to change your email preferences or to find a new Trip.')*/
        res.send('You have cancelled a seat')
    })
})
//get list of trip ids with driver id
app.get('/api/users/driver/:email',function(req,res){
    console.log('get trips as driver:'+req.params.email)
    var cursor=db.collection('Trips').find({'email':req.params.email}).toArray(function(err, results) {
        if (err) throw err;
        //console.log(results)
        res.send(results)
    })
})
//get list of trips with user as passenger
app.get('/api/users/passenger/:email',function(req,res){
    console.log('get trips as passenger:'+req.params.email)
    //res.send('get trips for passenger received')
    var cursor=db.collection('Trips').find({'passengers':{$elemMatch:{email:req.params.email}}}).toArray(function(err, results) {
        if (err) throw err;
        //console.log(results)
        res.send(results)
    })
})
//get passengers for a trip
app.get('/api/passengers/:trip',function(req,res){
    console.log('get passenger info for trip:'+req.params.trip)
    db.collection('Trips').find({'_id':ObjectId(req.params.trip)}).toArray(function(error, trip) {
        if (error) throw error;
        //console.log(JSON.stringify(trip))
        if('passengers' in trip[0]){
            db.collection('Users').find({'userId':{$in:trip[0]['passengers']}}).toArray(function(err,details){
                if(err) throw err;
                res.send(details)
            })
        }
        else{
            res.send([])
        }
    })
})

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.get('/sp',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/spindex.html'));
});
/*app.get('/public/images/:filename',function(req,res){
    res.sendFile(path.join(__dirname+'/public/images/'+req.params.filename));
})*/
//app.use(express.static('public'))
/*app.get('/.well-known/pki-validation/:filename',function(req,res){
    res.sendFile(path.join(__dirname+'/.well-known/pki-validation/'+req.params.filename));
})*/
var checkEmailPref=function(email,setting){
    return new Promise(function(resolve,reject){
        db.collection('Users').find({'email':email}).toArray(function(err, results) {
            console.log('Users email pref:'+JSON.stringify(results))
            if(results[0]['allEmail']=='on'){
                console.log('all email')
                //return true;
                resolve(true);
            }else if(results[0]['noEmail']=='on'){
                console.log('no email')
                //return false;
                resolve(false);
            }else if(results[0][setting]=='off'){
                console.log('no match pref')
                //return false;
                resolve(false);
            }
            console.log('match pref')
            //return true;
            resolve(true);
        })
    })
}
function sendEmail(recipient,msg,reason='Temple Carpool Notification'){
    nodemailerMailgun.sendMail({
        from: 'no-reply@mailgun.templecarpool.com',
        to:recipient,
        subject:reason,
        text:msg
    },function(err,info){
        if(err){
            console.log('Email Error: '+err);
        }else{
            console.log('Response: '+info);
        }
    });
}
app.use(function(req,res,next){
    res.status(404).sendFile(path.join(__dirname+'/views/404.html'));
})
process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
})
