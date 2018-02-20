const http = require('http')
const https = require('https')
const path = require('path')
//const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
//const GoogleAuth = require('google-auth-library');

const port = 80

const app=express()

//var auth = new GoogleAuth;
//app.authClient = new auth.OAuth2(config.passport.google.clientID, config.passport.google.clientSecret, '');
/*var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: config.passport.google.clientID,
    clientSecret: config.passport.google.clientSecret,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));*/

var stakes=["Annapolis","Baltimore","Columbia","Frederick","Seneca","Silver Spring","Suitland","Washington, DC","Altoona","Chambersburg","Pitsburgh","Annandale","Ashburn","Buena Vista(YSA)","Centreville","Chesapeake","Fredricksburg","Gainesville","McLean","Mt Vernon","Newport News","Oakton","Pembroke","Richmond-Chesterfield","Richmond-Midlothian","Richmond","Roanoke","Stafford","Virginia Beach","Washington DC(YSA)","Winchester","Waynesboro","Woodbridge","Clarksburg","Martinsburg"];
var temples=['Philadelphia','Columbus']

var schedule = require('node-schedule')
var MongoClient=require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url="mongodb://localhost:27017/templeCarpoolDB";
var db;

MongoClient.connect(url,function(err,host){
    if(err) throw err;
    db=host.db('templeCarpoolDB')
    app.listen(port,()=>{
        console.log('listening on '+port.toString());
    });
})

//see https://www.npmjs.com/package/node-schedule
var cleanUp = schedule.scheduleJob('0 0 23 * * *',function(){
    console.log((new Date()).toLocaleString()+': should remove any trip that has a return date == today-1')
});

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
//create a trip
app.post('/api/trips/add',function(req,res){
    console.log('adding trip:'+JSON.stringify(req.body));
    //verify body
    var keys=Object.keys(req.body);
    //check number of keys
    if(keys.length!=9){
        res.send('You have sent the wrong amount of information '+keys.length);
    }
    //check key names
    if(keys.indexOf('driver')>=0&&keys.indexOf('email')&&keys.indexOf('dDate')&&
        keys.indexOf('dTime')&&keys.indexOf('rDate')&&keys.indexOf('rTime')&&
        keys.indexOf('numSeats')&&keys.indexOf('departStake')&&keys.indexOf('templeDest')){
        res.send('You have sent the wrong kind of information');
    }
    //check some values
    if(req.body.email.indexOf('@')>=0){
        res.send('You need a valid email');
    }
    if(req.body.numSeats>=1){
        res.send('You need at least 1 seat');
    }
    /*console.log('driver:'+req.body.driver)
    console.log('email:'+req.body.email)
    console.log('depD:'+req.body.dDate)
    console.log('depT:'+req.body.dTime)
    console.log('retD:'+req.body.rDate)
    console.log('retT:'+req.body.rTime)
    console.log('seat:'+req.body.numSeats)
    console.log('stake:'+departStake)
    console.log('temple:'+templeDest)*/
    //check if driver has trip with same return or depart date
    var dquery={dDate:req.body.dDate, email:req.body.email};
    var rquery={rDate:req.body.rDate, email:req.body.email};
    var cursor=db.collection('Trips').find({$or:[dquery,rquery]}).toArray(function(err, results) {
        if(err){
            res.status(500).send('Some error:'+err)
            return;
        } 
        console.log('depart query results:'+results)
        console.log(results=='')
        if(results!=''){
            console.log('add error')
            if(req.body.dDate==results['dDate']){
                res.send('You already have scheduled depart trip on '+req.body.dDate)
            }else{
                res.send('You already have scheduled return trip on '+req.body.rDate)
            }
            //res.status(500).send('You already have scheduled trip on '+req.body.dDate+' or '+req.body.rDate)
        }else{
            db.collection('Trips').save(req.body,(err,result)=>{
                if(err) return console.log('An error: '+err)

                console.log('saved trip to db')
            })
            //res.redirect('/')
            res.send('Your ride has been posted')
        }
    })
})
/*app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.post('/tokensignin',function(req,res){
    console.log('post: '+Object.keys(req.body))
    /*console.log('statusMsg: '+req['statusMessage'])
    console.log(req['headers'])
    console.log(req['params'])
    console.log(req['query'])*/
    /*req.app.authClient.verifyIdToken(
        token,
        config.passport.google.clientID,  // Specify the CLIENT_ID of the app that accesses the backend
        function(e, login) {
          var payload = login.getPayload();
          var userid = payload['sub'];
          // If request specified a G Suite domain:
          //var domain = payload['hd'];
    });
    res.send('POST request to the homepage')
})*/
//reserve a seat for a trip
app.post('/api/trips/:trip/:passenger',function(req,res){
    console.log('trip param:'+req.params.trip)
    console.log('passenger param:'+req.params.passenger)
    //check if passenger has a seat 
    var pquery={'_id':ObjectId(req.params.trip),passengers:{$in:[req.params.passenger]}};
    //check if trip is full
    var t={}
    /*db.collection('Trips').find({'_id':ObjectId(req.params.trip)}).toArray(function(err,result){
        var trip=result[0];
        //console.log('trip:'+JSON.stringify(trip))
        //console.log('passengers' in trip)
        var passLen='passengers' in trip?trip['passengers'].length:0;
        
        t['$size']=parseInt(trip['numSeats'])
        //console.log('t:'+JSON.stringify(t))
        var fquery={'_id':ObjectId(req.params.trip),'passenger':t};
        //check if you're the driver
        var name='';
        db.collection('Users').find({'userId':req.params.passenger}).toArray(function(err,result){
            var user=result[0];
            console.log('user:'+JSON.stringify(user))

            name=user['name']
            console.log('name:'+name)
            var dquery={'_id':ObjectId(req.params.trip),'driver':name};
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
                    if(name==results[0]['driver']){
                        console.log('you\'re the driver')
                        res.send('You\'re the driver')
                    }
                    else if('passengers' in results[0] && results[0]['passengers'].indexOf(req.params.passenger)>-1){
                        console.log('already have a seat')
                        res.send('You already have a seat reserved')
                    }
                    else{
                        console.log('no more seats')
                        res.send('There are no more available seats')
                    }
                }else{
                    db.collection('Trips').update({'_id':ObjectId(req.params.trip)},{ $push: { "passengers": req.params.passenger }},function(err,res){
                        if(err) throw err

                        console.log('reserved seat on trip ')
                    })
                    res.send('Your seat has been reservd')
                }
            })
        })
    })*/
})

//update a trip as driver
app.put('/api/trips/:trip',function(req,res){
    console.log('trip:'+req.params.trip)
    console.log('driver:'+req.body.driver)
    console.log('email:'+req.body.email)
    console.log('depD:'+req.body.dDate)
    console.log('depT:'+req.body.dTime)
    console.log('retD:'+req.body.rDate)
    console.log('retT:'+req.body.rTime)
    console.log('seat:'+req.body.numSeats)
    res.send('update ride received')
})

//get trip with ID-obsolete?
app.get('/api/trips/:trip',function(req,res){
    console.log('getting trip:'+req.params.trip)
    db.collection('Trips').find({'_id':ObjectId(req.params.trip)}).toArray(function(err,result){
        if(err){
            res.status(500).send('Some error:'+err)
            return;
        }
        console.log('returning trip: '+JSON.stringify(result[0]))
        res.send(result[0])
    })
})
//remove a trip with ID
app.delete('/api/trips/:trip',function(req,res){
    console.log('deleting trip:'+req.params.trip)
    //res.send('remove ride received')
    db.collection('Trips').deleteOne({'_id':ObjectId(req.params.trip)},function(err,result){
        if(err){
            res.status(500).send('Some error:'+err)
            return;
        }
        console.log('deleted trip')
        res.send('The trip has been deleted')
    })
})
//remove a passenger from a trip
app.delete('/api/trips/:trip/:passenger',function(req,res){
    console.log('trip:'+req.params.trip)
    console.log('trip:'+req.params.passenger)
    //TODO check that passenger is a passenger for said trip?
    db.collection('Trips').update({'_id':ObjectId(req.params.trip)},{ $pull: { passengers: req.params.passenger} },function(err, results) {
        if (err) throw err;
        console.log('You have dropped the trip')
        res.send('You have cancelled your seat')
    })
})
//get list of trip ids with driver id
app.get('/api/users/driver/:driver',function(req,res){
    console.log('get trips as driver:'+req.params.driver)
    var cursor=db.collection('Trips').find({'driverId':req.params.driver}).toArray(function(err, results) {
        if (err) throw err;
        //console.log(results)
        res.send(results)
    })
})
//get list of trips with user as passenger
app.get('/api/users/passenger/:passenger',function(req,res){
    console.log('get trips as passenger:'+req.params.passenger)
    //res.send('get trips for passenger received')
    var cursor=db.collection('Trips').find({'passengers':req.params.passenger}).toArray(function(err, results) {
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
//add user for lookup
/*app.post('/api/users/add',function(req,res){
    /*console.log('driver:'+req.body.user-id)
    console.log('email:'+req.body.email)
    console.log('depD:'+req.body.name)*/
    //check if driver has trip with same return or depart date-msg edit or remove trip
    /*var query={'userId':req.body.userId};
    db.collection('Users').find(query).toArray(function(err, results) {
        if(err){
            res.status(501).send('Some error:'+err)
        } 
        //console.log('add query results:'+results)
        //console.log(results=='')
        if(results!=''){
            //console.log('add user error')
            res.status(200).send('User already in DB')
        }else{
            db.collection('Users').save(req.body,(err,result)=>{
                if(err) return console.log('An error: '+err)

                console.log('saved user to db')
            })
            //res.redirect('/')
            res.send('Your user has been saved')
        }
    })
})*/
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.use(function(req,res,next){
    res.status(404).sendFile(path.join(__dirname+'/views/404.html'));
})
