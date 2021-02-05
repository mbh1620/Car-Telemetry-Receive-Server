var express = require('express');
var app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http);
var fs = require('fs');
var Tail = require('tail').Tail;

tail = new Tail("./public/data.csv");

var readbytes = 0;
var bite_size = 256;
var file;

// would be nice to have a user interface similar to this https://www.pinterest.com.au/pin/395402042262052760/?d=t&mt=login

app.use('/public', express.static('public'));
app.use('/stylesheets', express.static('./views/stylesheets'));
app.use('/modules', express.static('/node/modules'));
app.use('/scripts', express.static('./views/scripts'));

app.get("/", function(req, res){
    res.render("menu.ejs");
})

app.get("/primary", function(req, res){
    res.render("primary-dash.ejs");
})

app.get("/config", function(req,res){
    res.render("config-page.ejs");
})

app.get("/instructions", function(req,res){
    res.render("instructions.ejs");
})




/*
    Socket.io connector, 

    Starts sending data to new connections
*/

io.on("connection", function(socket){
    io.emit('new-data', {data:20})
})

/* 

    Make a route for each of the main sections such as:

    Accumulator management system

    Inverter Data 

    ECU 

    Kistner data

    Then only emit the relevant data to the people on those routes.

*/

tail.on("line", function(data){
    console.log(data);
    //substring data to split into all the different metrics
    data = data.split(',');
    data[0] = parseFloat(data[0]);
    data[1] = parseFloat(data[1]);
    data[2] = parseFloat(data[2]);
    console.log("file has updated");
    io.emit('new-data', {data:data});
});
tail.on("error", function(error) {
    console.log('ERROR: ', error);
});
    
http.listen("8080");
