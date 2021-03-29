var express = require('express');
const path = require('path');
var app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http);
var fs = require('fs');
var Tail = require('tail').Tail;
var mongoose = require('mongoose');
var csv = require('csvtojson');


//DataSession Model import
var DataSession = require("./models/dataSession");
//Import custom routes 

var testingroutes = require("./routes/testing_routes");
var dataroutes = require("./routes/data_routes");

/**
 * @file app.js - Used to start the server.
 */

app.set('views', path.join(__dirname, './views/'));

app.use(express.static(__dirname + '../views'));
app.use('/public', express.static(path.join(__dirname,'./public')));
app.use('/stylesheets', express.static(path.join(__dirname, './views/stylesheets')));
app.use('/modules', express.static(path.join(__dirname, '/node/modules')));
app.use('/scripts', express.static(path.join(__dirname, './views/scripts')));
app.use('/docs', express.static(path.join(__dirname, './out')));

fs.appendFileSync("./public/data.csv", " ")
fs.appendFileSync("./public/ECU_data.csv", " ")
fs.appendFileSync("./public/Accum_data.csv", " ")
fs.appendFileSync("./public/Inverter_data.csv", " ")
fs.appendFileSync("./public/Position_data.csv", " ")


tail = new Tail("./public/data.csv");
tail_ECU = new Tail("./public/ECU_data.csv");
tail_Accum = new Tail("./public/Accum_data.csv");
tail_Inverter = new Tail("./public/Inverter_data.csv");
tail_Position = new Tail("./public/Position_data.csv");

var readbytes = 0;
var bite_size = 256;
var file;
var python;

// would be nice to have a user interface similar to this https://www.pinterest.com.au/pin/395402042262052760/?d=t&mt=login

app.use("/", testingroutes);
app.use("/", dataroutes);

//DB connection 

mongoose.connect("mongodb+srv://matthew01:haywood@cluster0.drwm0.mongodb.net/Electric-Car-Telemetry-DB?retryWrites=true&w=majority", { useUnifiedTopology:true, useNewUrlParser: true, useFindAndModify: false });

//Index route
app.get("/", function(req, res){
    res.redirect("/primary");
    // res.render("menu.ejs");
})

/**
 * Route allowing to start a new data session. This route deletes the contents of the data.csv files to prepare
 * them for a new data session.
 * 
 * @memberof Routes
 * @name get/start-data-session
 * @function

 * @see reset_files function. 
 */

app.get("/start-data-session", function(req,res){
    //Code in here will start and prepare the file and data model for creating a data session to add to the database
    //Will clear existing files
    reset_files();
    console.log("reset files");
})

/**
 * Route allowing to stop a data session. This route saves the contents of the data files to mongoDB object and then pushes them 
 * to the DB. 
 * 
 * @memberof Routes
 * @name get/stop-data-session
 * @function 
 */

app.get("/stop-data-session/:name", function(req,res){
    //Code in here will be called after a session has taken place so that it packages all the current data into a 'dataSession' Schema 
    //and then push it to the mongoDB Atlas database.

    //First of all we will just create a basic schema for speed, acceleration and battery level, session name, date and also time label
    var name = req.params.name;
    var date = new Date()
    var size = fs.statSync("./public/data.csv").size/10e6;
    size = size.toFixed(3);
    var data = fs.readFileSync("./public/data.csv", 'utf8');
    var POSData = fs.readFileSync("./public/Position_data.csv", 'utf8');
    var INVData = fs.readFileSync("./public/Inverter_data.csv", 'utf8');
    var ECUData = fs.readFileSync("./public/ECU_data.csv", 'utf8');
    var returnOBJ = [];
    var POSreturnOBJ = [];
    var INVreturnOBJ = [];
    var ECUreturnOBJ = [];
    var NewDataSession;
    csv({
        noheader:true,
        output:"csv",
    })
    .fromString(data)
    .then((csvRow)=>{
        returnOBJ.push(csvRow);
        returnOBJ[0].pop();
        csv({
            noheader:true,
            output:"csv",
        })
        .fromString(POSData)
        .then((POScsvRow)=>{
            POSreturnOBJ.push(POScsvRow);
            POSreturnOBJ[0].pop();
            csv({
                noheader:true,
                output:"csv",
            })
            .fromString(ECUData)
            .then((ECUcsvRow)=>{
                ECUreturnOBJ.push(ECUcsvRow);
                ECUreturnOBJ[0].pop();
                csv({
                    noheader:true,
                    output:"csv",
                })
                .fromString(INVData)
                .then((INVcsvRow)=>{
                    INVreturnOBJ.push(INVcsvRow);
                    INVreturnOBJ[0].pop();

                    NewDataSession = {
                        name: name,
                        dateCreated: date,
                        PRIData: returnOBJ[0],
                        POSData: POSreturnOBJ[0],
                        INVData: INVreturnOBJ[0],
                        size: size
                    }
                    console.log(NewDataSession);
                    DataSession.create(NewDataSession, function(err, newSession){
                        if(err){
                            console.log(err);
                        } else {
                            res.end();
                        }
                    })
                })
            })
        })
    })
})



//Delete route for a session

app.post("/session/delete/:id", function(req, res){
    DataSession.findByIdAndDelete(req.params.id, function(err){
        res.end();
    })
})

app.get("/config", function(req,res){
    res.render("config-page.ejs");
})

app.get("/instructions", function(req,res){
    res.render("instructions.ejs");
})

app.get("/session", function(req,res){
    DataSession.find({}, "name dateCreated size",function(err, allSessions){ //Finds all dataSession records without returning data which slows down the program
        res.render("session.ejs", {sessions: allSessions});
    }
)
})

//Route for displaying historical data
app.get("/session/:data/:id", function(req,res){
    //Data can be PRI, ACC, ECU or POS
    //id is the id of the data session
    if(req.params.data == 'PRI'){
        DataSession.findById(req.params.id, function(err, foundSession){
            res.render("session-load.ejs", {session: foundSession});
        })
    }
    if(req.params.data == 'POS'){
        DataSession.findById(req.params.id, function(err, foundSession){
            res.render("session-load-map.ejs", {session: foundSession});
        })
    }
    
})

/**
 * Used to clear the contents of the data.csv files
 * 
 * @function reset_files
 */

function reset_files(){
    fs.writeFileSync("./public/data.csv", " ");
    fs.writeFileSync("./public/ECU_data.csv", " ");
    fs.writeFileSync("./public/Accum_data.csv", " ");
    fs.writeFileSync("./public/Inverter_data.csv", " ");
    fs.writeFileSync("./public/Position_data.csv", " ");
    console.log("started new data session");
}

io.on("connection", function(socket){
    console.log("User connected");
    socket.on("disconnect", function(socket){
        console.log("User disconnected");
    })

    socket.on("PRI", function(){
        socket.leave("ECU Room").leave("Accumulator Room").leave("Inverter Room").leave("Map Room");
        socket.join('Primary Room');
        console.log(socket.id + " joined Primary Room");
    })

    socket.on("ECU", function(){
        socket.leave("Primary Room").leave("Accumulator Room").leave("Inverter Room").leave("Map Room");
        socket.join("ECU Room");
        console.log(socket.id + " joined ECU Room");
    })

    socket.on("ACC", function(){
        socket.leave("Primary Room").leave("ECU Room").leave("Inverter Room").leave("Map Room");
        socket.join("Accumulator Room");
        console.log(socket.id + " joined Accumulator room");
    })

    socket.on("INV", function(){
        socket.leave("Primary Room").leave("ECU Room").leave("Accumulator Room").leave("Map Room");
        socket.join("Inverter Room");
        console.log(socket.id + " joined Inverter room");
    })

    socket.on("GPS", function(){
        socket.leave("Primary Room").leave("ECU Room").leave("Accumulator Room").leave("Inverter Room");
        socket.join("Map Room");
        console.log(socket.id + " joined Map Room");
    })

    socket.on("Start_data_session", function(){
        reset_files();
    })

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
    io.to('Primary Room').emit('primary-data', {data:data});
});
tail.on("error", function(error) {
    console.log('ERROR: ', error);
});

//-------------------------------------------------
//                 Room emit events
//-------------------------------------------------

//ECU Room //On tail of ECU file emit to ECU room 
tail_ECU.on("line", function(data2){
    console.log(data2);
    //substring data to split into all the different metrics
    data2 = data2.split(',');
    data2[0] = parseFloat(data2[0]);
    data2[1] = parseFloat(data2[1]);
    data2[2] = parseFloat(data2[2]);
    console.log("file has updated");
    io.to('ECU Room').emit('ecu-data', {data:data2});
});
tail_ECU.on("error", function(error) {
    console.log('ERROR: ', error);
});

//Accumulator Room //On tail of Accumulator File emit to th 
tail_Accum.on("line", function(data3){
    console.log(data3);
    //substring data to split into all the different metrics
    data3 = data3.split(',');
    
    for(var i = 0; i < data3.length; i++){
        data3[i] = parseFloat(data3[i])
    }

    console.log("file has updated");
    io.to('Accumulator Room').emit('acc-data', {data:data3});
});
tail_Accum.on("error", function(error) {
    console.log('ERROR: ', error);
});

//Inverter Room

tail_Inverter.on("line", function(data){
    console.log(data);
    //substring data to split into all the different metrics
    data = data.split(',');
    data[0] = parseFloat(data[0]);
    data[1] = parseFloat(data[1]);
    data[2] = parseFloat(data[2]);
    console.log("file has updated");
    io.to('Inverter Room').emit('inv-data', {data:data});
});
tail_Accum.on("error", function(error) {
    console.log('ERROR: ', error);
});

//Position Room

tail_Position.on("line", function(data){
    console.log(data);
    //substring data to split into all the different metrics
    data = data.split(',');
    //Convert string data into numbers
    data[0] = parseFloat(data[0]);
    data[1] = parseFloat(data[1]);
    data[2] = parseFloat(data[2]);
    console.log("file has updated");
    io.to('Map Room').emit('position-data', {data:data});
});
tail_Position.on("error", function(error) {
    console.log('ERROR: ', error);
});

http.listen("8080", function(){
    console.log("listening on port 8080");
});

module.exports = app; // for testing