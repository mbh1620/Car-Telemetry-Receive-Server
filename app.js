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

app.use('/public', express.static('public'));
app.use('/modules', express.static('/node/modules'));
app.use('/scripts', express.static('./views/scripts'));

app.get("/", function(req, res){
    res.render("dash.ejs");
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
