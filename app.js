const http = require('http')
const https = require('https')
const path = require('path')
//const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const { OAuth2Client } = require('google-auth-library');

const port = 80

var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/templeCarpoolDB";
var db;

MongoClient.connect(url,function(err,client){
    if(err) throw err;
    db=client.db('templeCarpoolDB')
    app.listen(port,()=>{
        console.log('listening on '+port.toString());
    });
    //console.log("Database created");
    //db.close();
        /*db.collection('trips').find().toArray(function(err,result){
            if(err) throw err

            console.log(result)
        })*/
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
    //check if trip is full
    var pquery={passengers:{$in:[req.params.passenger]}};
    var trip=db.collection('Trips').findOne({'_id':req.params.trip})//['passengers'].length
    var passLen='passengers' in trip?trip['passengers'].length:0
    var t={}
    t['$eq']=passLen.toString()
    var fquery={'numSeats':t};
    //check if you are the driver
    //var fquery={'numSeats:{$eq:'+passLen.toString()+'}'};
    var cursor=db.collection('Trips').find({$or:[pquery,fquery]}).toArray(function(err, results) {
        if(err){
            res.status(501).send('Some error:'+err)
        } 
        console.log('reserve query results:'+results)
        console.log(results=='')
        if(results!=''){
            console.log('reserve error')
            if(req.params.passenger in results['passengers']){
                res.status(500).send('You already have a seat reserved')
            }else{
                res.status(500).send('There are no more available seats')
            }
            //res.status(500).send('You already have a reserved seat OR there are no more seats')
        }else{
            db.collection('Trips').update({'_id':req.params.trip},{ $push: { "passengers": req.params.passenger }})/*,(err,result)=>{
                if(err) return console.log('An error: '+err)

                console.log('reserved seat on trip ')
            })*/
            //res.redirect('/')
            console.log('reserved seat on trip ')
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
        console.log(results)
        res.send(results)
        // send HTML file populated with quotes here
    })
    //res.send(trips)
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
    res.send('delete passenger received')
})
//get list of trip ids with driver id
app.get('/api/users/:driver',function(req,res){
    console.log('trip:'+req.params.driver)
    res.send('get trips for driver received')
})
//get list of trips with user as passenger
app.get('/api/users/:passenger',function(req,res){
    console.log('trip:'+req.params.passenger)
    res.send('get trips for passenger received')
})
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.use(function(req,res,next){
    //res.status(404).send("Sorry can't find that!")
    res.status(404).sendFile(path.join(__dirname+'/views/404.html'));
})
//app.listen(port);
/*var auth=new GoogleAuth();
client=new auth.OAuth2('312484233782-6q2cd48kt6ptuotlcs5mv59vk1n9q9hp.apps.googleusercontent.com','','');

client.verifyIdToken(
    token,
    '312484233782-6q2cd48kt6ptuotlcs5mv59vk1n9q9hp.apps.googleusercontent.com',
    function(e,login) {
        payload=login.getPayload();
        userid=payload['sub'];
    });*/

/*fs.readFile('./views/index.html',function(err,html) {
    if(err){
        throw err;
    }
    http.createServer(function(request,response) {
        response.writeHeader(200,{"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(port);
});*/
/*const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if(err){
        return console.log('something bad happened',err)
    }

    console.log(`server is listening on ${port}`)
})*/
