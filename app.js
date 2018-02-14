const http = require('http')
const https = require('https')
const path = require('path')
//const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const { OAuth2Client } = require('google-auth-library');

const port = 80

var MongoClient=require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url="mongodb://localhost:27017/templeCarpoolDB";
var db;

MongoClient.connect(url,function(err,client){
    if(err) throw err;
    db=client.db('templeCarpoolDB')
    app.listen(port,()=>{
        console.log('listening on '+port.toString());
    });
})

const app=express()

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/tokensignin',function(req,res){
    console.log('post: '+Object.keys(req))
    /*console.log('statusMsg: '+req['statusMessage'])
    console.log(req['headers'])
    console.log(req['params'])
    console.log(req['query'])*/
    res.send('POST request to the homepage')
})
//reserve a seat for a trip
app.post('/api/trips/:trip/:passenger',function(req,res){
    console.log('trip:'+req.params.trip)
    console.log('passenger:'+req.params.passenger)
    //check if passenger has a seat
    
    var pquery={passengers:{$in:[req.params.passenger]}};
    //var trip={};//=db.collection('Trips').find(ObjectId(req.params.trip)).toArray()[0]
    
    /*db.collection('Trips').find().toArray(function(err,trips){
        console.log('trips:'+JSON.stringify(trips))    
    });*/
    //check if trip is full
    var t={}
    db.collection('Trips').find({'_id':ObjectId(req.params.trip)}).toArray(function(err,result){
        var trip=result[0];
        console.log('trip:'+JSON.stringify(trip))
        console.log('passengers' in trip)
        var passLen='passengers' in trip?trip['passengers'].length:0;
        
        t['$size']=parseInt(trip['numSeats'])
    })
    print('t:'+JSON.stringify(t))
    var fquery={'_id':ObjectId(req.params.trip),'passenger':t};
    //console.log('trip:'+JSON.stringify(trip))
    //console.log('passengers' in trip)
    
    //console.log('passengers:'+passLen.toString());
    
    //check if you are the driver
    var name='';
    db.collection('Users').find({'userId':ObjectId(req.params.passenger)}).toArray(function(err,result){
        var user=result[0];
        console.log('user:'+JSON.stringify(user))

        name=user['name']
    })
    print('name:'+name)
    var dquery={'driver':name};
    var cursor=db.collection('Trips').find({$or:[pquery,fquery,dquery]}).toArray(function(err, results) {
        if(err){
            console.log('some error 501')
            res.status(501).send('Some error:'+err)
            return;
        } 
        console.log('reserve query results:'+JSON.stringify(results))
        console.log(results=='')
        if(results!=null){
            console.log('reserve error')
            if(name==results['driver']){
                console.log('you\'re the driver')
                res.status(500).send('You\'re the driver')
            }
            else if(req.params.passenger in results['passengers']){
                console.log('already have a seat')
                res.status(500).send('You already have a seat reserved')
            }
            else{
                console.log('no more seats')
                res.status(500).send('There are no more available seats')
            }
            //res.status(500).send('You already have a reserved seat OR there are no more seats')
        }else{
            db.collection('Trips').update({'_id':ObjectId(req.params.trip)},{ $push: { "passengers": req.params.passenger }},function(err,res){
                if(err) throw err

                console.log('reserved seat on trip ')
            })/*,(err,result)=>{
                if(err) return console.log('An error: '+err)

                console.log('reserved seat on trip ')
            })*/
            //res.redirect('/')
            //console.log('reserved seat on trip ')
            res.send('Your seat has been reservd')
        }
    })
    //reserve the seat
    //res.send('post seat received')
})
//create a trip
app.post('/api/trips/add',function(req,res){
    /*console.log('driver:'+req.body.driver)
    console.log('driverId:'+req.body.driverId)
    console.log('email:'+req.body.email)
    console.log('depD:'+req.body.dDate)
    console.log('depT:'+req.body.dTime)
    console.log('retD:'+req.body.rDate)
    console.log('retT:'+req.body.rTime)
    console.log('seat:'+req.body.numSeats)*/
    //check if driver has trip with same return or depart date-msg edit or remove trip
    var dquery={dDate:req.body.dDate, driverId:req.body.driverId};
    var rquery={rDate:req.body.rDate, driverId:req.body.driverId};
    var cursor=db.collection('Trips').find({$or:[dquery,rquery]}).toArray(function(err, results) {
        if(err){
            res.status(501).send('Some error:'+err)
        } 
        console.log('depart query results:'+results)
        console.log(results=='')
        if(results!=''){
            console.log('add error')
            if(req.body.dDate==results['dDate']){
                res.status(500).send('You already have scheduled depart trip on '+req.body.dDate)
            }else{
                res.status(500).send('You already have scheduled return trip on '+req.body.rDate)
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
//get all trips
app.get('/api/trips',function(req,res){
    var cursor=db.collection('Trips').find().toArray(function(err, results) {
        //console.log(results)
        res.send(results)
    })
})
//get trip with ID
app.get('/api/trips/:trip',function(req,res){
    console.log('trip:'+req.params.trip)
    res.send('get ride received')
})
//remove a trip with ID
app.delete('/api/trips/:trip',function(req,res){
    console.log('trip:'+req.params.trip)
    res.send('remove ride received')
})
//remove a passenger from a trip
app.delete('/api/trips/:trip/:passenger',function(req,res){
    console.log('trip:'+req.params.trip)
    console.log('trip:'+req.params.passenger)
    //res.send('delete passenger received')
    var cursor=db.collection('Trips').update({'_id':ObjectId(req.params.trip)},{ $pull: { passenger: req.params.passenger} },function(err, results) {
        if (err) throw err;
        //console.log(results)
        res.send('removed')
    })
})
//get list of trip ids with driver id
app.get('/api/users/driver/:driver',function(req,res){
    console.log('trips driver:'+req.params.driver)
    var cursor=db.collection('Trips').find({'driverId':req.params.driver}).toArray(function(err, results) {
        if (err) throw err;
        //console.log(results)
        res.send(results)
    })
})
//get list of trips with user as passenger
app.get('/api/users/passenger/:passenger',function(req,res){
    console.log('trip:'+req.params.passenger)
    //res.send('get trips for passenger received')
    var cursor=db.collection('Trips').find({'passenger':req.params.passenger}).toArray(function(err, results) {
        if (err) throw err;
        //console.log(results)
        res.send(results)
    })
})
app.post('/api/users/add',function(req,res){
    /*console.log('driver:'+req.body.user-id)
    console.log('email:'+req.body.email)
    console.log('depD:'+req.body.name)*/
    //check if driver has trip with same return or depart date-msg edit or remove trip
    var query={'userId':req.body.userId};
    var cursor=db.collection('Users').find(query).toArray(function(err, results) {
        if(err){
            res.status(501).send('Some error:'+err)
        } 
        console.log('depart query results:'+results)
        console.log(results=='')
        if(results!=''){
            console.log('add user error')
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
})
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.use(function(req,res,next){
    //res.status(404).send("Sorry can't find that!")
    res.status(404).sendFile(path.join(__dirname+'/views/404.html'));
})
