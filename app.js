const http = require('http')
const path = require('path')
const fs = require('fs')
const express = require('express')
const { OAuth2Client } = require('google-auth-library');

const port = 80

const app=express()

app.use(express.static(path.join(__dirname,'public')));

app.post('/tokensignin',function(req,res){
    console.log('post: '+req)
    res.send('POST request to the homepage')
})
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.use(function(req,res,next){
    //res.status(404).send("Sorry can't find that!")
    res.status(404).sendFile(path.join(__dirname+'/views/404.html'));
})
app.listen(port);
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
