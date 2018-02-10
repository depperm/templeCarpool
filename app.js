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
//OBSOLETE?
app.post('/postRide',function(req,res){
    console.log('driver:'+req.body.driver)
    console.log('email:'+req.body.email)
    console.log('depD:'+req.body.dDate)
    console.log('depT:'+req.body.dTime)
    console.log('retD:'+req.body.rDate)
    console.log('retT:'+req.body.rTime)
    console.log('seat:'+req.body.numSeats)
    res.send('post ride received')
})
//OBSOLETE?
app.post('/findRide',function(req,res){
    console.log('dept:'+req.body.departDate)
    console.log('ret: '+req.body.returnDate)
    /*console.log(req.body.departDate)
    console.log(req.params);
    console.log(req.body);
    console.log(req.query);*/
    res.send('find a recieved')
})
//reserve a seat for a trip
app.post('/api/trips/:trip/:passenger',function(req,res){
    console.log('trip:'+req.params.trip)
    console.log('passenger:'+req.params.passenger)
    //console.log('depD:'+req.body.dDate)
    //console.log('depT:'+req.body.dTime)
    //console.log('retD:'+req.body.rDate)
    //console.log('retT:'+req.body.rTime)
    //console.log('seat:'+req.body.numSeats)
    res.send('post seat received')
})
//create a trip
app.post('/api/trips',function(req,res){
    console.log('driver:'+req.body.driver)
    console.log('email:'+req.body.email)
    console.log('depD:'+req.body.dDate)
    console.log('depT:'+req.body.dTime)
    console.log('retD:'+req.body.rDate)
    console.log('retT:'+req.body.rTime)
    console.log('seat:'+req.body.numSeats)

    db.collection('Trips').save(req.body,(err,result)=>{
        if(err) return console.log(err)

        console.log('saved trip to db')
    })
    //res.redirect('/')
    res.send('post ride received')
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
        res.send(trips)
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
