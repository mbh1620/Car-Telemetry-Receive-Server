var express = require('express');
var app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http);
var fs = require('fs');
var Tail = require('tail').Tail;
var mongoose = require('mongoose');

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

app.get("/start-data-session", function(req,res){
    //Code in here will start and prepare the file and data model for creating a data session to add to the database
    //Will clear existing files 
})

app.get("/stop-data-session", function(req,res){
    //Code in here will be called after a session has taken place so that it packages all the current data into a 'dataSession' Schema 
    //and then push it to the mongoDB Atlas database.
})

app.get("/primary", function(req, res){
    res.render("primary-dash.ejs");
})

app.get("/ecu", function(req, res){
    res.render("ecu-data-1.ejs");
})

app.get("/inverter", function(req, res){
    res.render("inverter-data.ejs");
})

app.get("/config", function(req,res){
    res.render("config-page.ejs");
})

app.get("/instructions", function(req,res){
    res.render("instructions.ejs");
})

app.get("/gps_map_1", function(req,res){
    res.render("gps-map-page1.ejs");
})



/*
    Socket.io connector, 

    Starts sending data to new connections
*/

io.on("connection", function(socket){
    var data = [20,30,40,40]
    // io.emit('primary-data', {data:data})
    // console.log("client connected");
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
    io.emit('primary-data', {data:data});
});
tail.on("error", function(error) {
    console.log('ERROR: ', error);
});
    
http.listen("8080");
