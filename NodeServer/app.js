var express = require('express');
const path = require('path');
var app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http);
var fs = require('fs');
var Tail = require('tail').Tail;
var mongoose = require('mongoose');
var csv = require('csvtojson');
var dotenv = require('dotenv').config();
let {PythonShell} = require('python-shell');

//AWS Includes
var AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.REGION
})
var kinesis = new AWS.Kinesis({region: process.env.REGION});
var dynamodb = new AWS.DynamoDB({region: process.env.REGION});
var S3 = new AWS.S3({region: process.env.REGION});
var lambda = new AWS.Lambda({region:process.env.REGION});

//----------------------------------------------------------------------------
//
//                     TELEMETRY RECEIVE NODE.JS SERVER
//
//----------------------------------------------------------------------------

// Matthew Haywood
/*

Server used to receive data from a RF module and then display in real time. This data will
then be streamed to AWS DynamoDB using AWS Kinesis.

*/

var dynamoDBName;

var testing_status = false;
var xbee_connected = false;

var channel_configuration = [{
}]

function populate_channels_from_csv(file){
var csv_file = fs.readFileSync("./public/channel_config.csv", 'utf-8');
var obj = []
csv({
    noheader:true,
    output:"csv",
})
.fromString(csv_file)
.then((csvRow)=>{
    // console.log(csvRow)
    obj.push(csvRow)
    for(var i = 0; i < obj[0].length; i++){
        channel_configuration.push({
            channel:obj[0][i][0],
            DataSection:obj[0][i][1],
            DataAlias:obj[0][i][2],
            DataType:obj[0][i][3]
        })
    }
    console.log(channel_configuration)
})
}

populate_channels_from_csv("./public/channel_config.csv");

app.use(function (req, res, next) {
    res.locals.testing_status = testing_status;
    res.locals.xbee_connected = xbee_connected; 
    next();
});

//Import custom routes 
var testingroutes = require("./routes/testing_routes");
var dataroutes = require("./routes/data_routes");
var pageroutes = require("./routes/page_routes")
const { config } = require('dotenv');
const { Kinesis } = require('aws-sdk');
const { interfaces } = require('mocha');
app.use(express.json());
app.use(express.urlencoded());
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

//Narrow down to just one data file

fs.appendFileSync("./public/data.csv", " ")
tail = new Tail("./public/data.csv");

var readbytes = 0;
var bite_size = 256;
var file;
var python;

// would be nice to have a user interface similar to this https://www.pinterest.com.au/pin/395402042262052760/?d=t&mt=login

app.use("/", testingroutes);
app.use("/", dataroutes);
app.use("/", pageroutes);

//Index route
app.get("/", function(req, res){
    res.redirect("/primary");
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
    res.end();
})

/**
 * Route allowing to stop a data session. This route saves the contents of the data files to mongoDB object and then pushes them 
 * to the DB. 
 * 
 * @memberof Routes
 * @name get/stop-data-session
 * @function 
 */

app.post("/stop-data-session", function(req,res){
    //Code in here will be called after a session has taken place so that it packages all the current data into a 'dataSession' Schema 
    //and then push it to the mongoDB Atlas database.

    //First of all we will just create a basic schema for speed, acceleration and battery level, session name, date and also time label
    var name = req.body.sessionName;
    var trackName = req.body.trackName;
    var lat = req.body.Lat;
    var long = req.body.Long;
    
    var date = new Date()
    var size = fs.statSync("./public/data.csv").size/10e6;
    size = size.toFixed(3);
    var data = fs.readFileSync("./public/data.csv", 'utf8');
    
    var returnOBJ = [];
    var NewDataSession;
    csv({
        noheader:true,
        output:"csv",
    })
    .fromString(data)
    .then((csvRow)=>{
        returnOBJ.push(csvRow);
        returnOBJ[0].pop();

        NewDataSession = {
        name: name,
        TrackName:trackName,
        TrackStartLine: [lat,long], 
        dateCreated: date,
        PRIData: returnOBJ[0],
        POSData: POSreturnOBJ[0],
        INVData: INVreturnOBJ[0],
        ECUData: ECUreturnOBJ[0],
        size: size
        }
                    // console.log(NewDataSession);
        DataSession.create(NewDataSession, function(err, newSession){
            if(err){
                console.log(err);
            } else {
                res.end();
            }
        })          
    })
})

//Function to start kinesis stream

function start_kinesis_stream(){

}

//Function to put new data into kinesis stream once Tail has detected it.
//

function put_Kinesis_data(data, data_ID){

    //Code here to put data into the kinesis stream
    var time = data[3]
    var record = JSON.stringify({
        time: data[3],
        PRIData: data.slice(0,34),
        ECUData: data.slice(7,22),
        ACCData: data.slice(23,69),
        INVData: data.slice(70, data.length),
        POSData: data.slice(4,6)
    })

    var recordParams = {
        Data: record, 
        PartitionKey: time,
        StreamName: 'ExampleTelemetryTest'
    }

    kinesis.putRecord(recordParams, function(err, data){
        if(err){
            console.log(err);
            io.to('Test Room').emit('log-data', {data:String(err)});
        } else {
            //Kinesis stream
            // io.to('Test Room').emit('log-data', {data:'Kinesis data ingestion successful'});
            // console.log('Successfully sent data to kinesis');
        }
    })

}

//Delete route for a session

app.post("/session/delete/:id", function(req, res){
    DataSession.findByIdAndDelete(req.params.id, function(err){
        res.end();
    })
})

app.post("/table/delete", function(req,res){
    console.log(req.body)
    params = {
        TableName: req.body.name
    }
    dynamodb.deleteTable(params, function(err, data){
        if(err){
            console.log(err)
        } else {
            console.log(data)
        }
    })
})

app.get("/session", function(req,res){
    dynamodb.listTables( function(err, data){
        if(err){
            console.log(err);
        } else {
            console.log(data);
            names = data.TableNames;
            res.render('session.ejs', {sessions:names})
            
        }
    })
})

//Load DynamoDB table
app.get("/session/:data/:TableName", function(req, res){
    var docClient = new AWS.DynamoDB.DocumentClient()

    var params = {
        TableName:req.params.TableName,
    }
    console.log('Scanning Data');
    docClient.scan(params, onScan);
    function onScan(err, data){
        if(err){
            console.log("Unable to scan the table", JSON.stringify(err, null, 2))
        } else {
            res.render('session-load-scroll.ejs', {session:data, tableName:req.params.TableName})
            console.log(data)
        }
    }


})

app.get("/export", function(req,res){
    dynamodb.listTables(function(err, tabledata){
        if(err){
            console.log(err)
        } else {
            console.log(tabledata)
            S3.listBuckets(function(err, bucketdata){
                console.log(bucketdata)
                res.render('session-export.ejs', {tabledata:tabledata, s3data: bucketdata});
            })
        }
    })
})

//Route for exporting dynamoDB table to S3 Bucket
app.get("/session/dyna-s3/:userId/:TableName/:S3_bucket", function(req,res){
    var params = {
        S3Bucket: req.params.S3_bucket,
        TableArn: 'arn:aws:dynamodb:eu-west-1:' + req.params.userId + ':table/'+ req.params.TableName
    }

    dynamodb.exportTableToPointInTime(params, function(err,data){
        if(err) console.log(err, err.stack);
        else {
            console.log(data);
            res.send(success);
        }
    })
})

app.post("/testing/start", function (req, res) {
    /**
    * Start the python script. The python script will start generating the data.
    * @memberof TestingRoutes.PythonScripts
    * @function
    * @name post
    * @param '/testing/start' The url
    * @instance
    */

    if(req.body.kinesis_stream == 'true'){
        io.to('Test Room').emit('log-data', {data:'Sending data to Kinesis Stream'})
    }

    if(req.body.name != '' && req.body.name != null){
        //set up a new dynamoDB table
        io.to('Test Room').emit('log-data', {data:'Setting up new dynamoDB table'});
        var params = {
            TableName: req.body.name,
            KeySchema: [
                {AttributeName: "partitionKey", KeyType: "HASH"},
            ],
            AttributeDefinitions: [
                { AttributeName: "partitionKey", AttributeType: "S"},
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        }
        dynamodb.createTable(params, function(err, data){
            if(err){
                console.log('unable to create table', JSON.stringify(err, null,2))
            } else {
                console.log("Created table", JSON.stringify(data, null, 2));
            }
        })

    }
    dynamoDBName = req.body.dbname;

    //Set lambda functions env to pass to correct dynamoDB

    var params = { 
        FunctionName: 'kinesis-dynamoDB',
        Environment: {
            Variables: {
                DYNAMODBTABLE: dynamoDBName
            }
        }
    }

    lambda.updateFunctionConfiguration(params, function(err, data){
        if(err){
            console.log(err);
        } else {
            console.log(data);
            io.to('Test Room').emit('log-data', {data:'Set LAMBDA function env to: ' + dynamoDBName});
        }
    })


    if(testing_status === false && xbee_connected === false){
        pyshell = new PythonShell('./python_scripts/test.py');    
    }

    pyshell.on('message', function(message){
    io.to('Test Room').emit('log-data', {data:message});
    })

    pyshell.end(function(err) {
        if(err){
            console.log(err)
            io.to('Test Room').emit('log-data', {data:err.traceback});
        }
    })

    testing_status = true;
    res.send("success");
})

app.post("/testing/stop", function (req, res) {
    /**
    * Stop the python script.
    * @memberof TestingRoutes.PythonScripts
    * @function
    * @name post
    * @param '/testing/stop' The url
    * @instance
    */
    
    pyshell.kill();
    io.to('Test Room').emit('log-data', {data:"Script stopped"});
    testing_status = false;
    res.send('success');
})

app.post("/xbee/connect", function(req, res){
    var baudRate = req.body.baud_rate;
    var COMport = req.body.com_port;
    var XbeeID;
    
    if(xbee_connected === false && testing_status === false){
        xbeeShell = new PythonShell('./python_scripts/receive_telem_serial.py', {args:[baudRate, COMport]});
        xbee_connected = true;
    }
    xbeeShell.on('message', function(message){
        io.to('Data-link Room').emit('log-data', {data:message});
    })
    xbeeShell.end(function(err) {
        if(err){
            console.log(err)
            io.to('Data-link Room').emit('log-data', {data:String(err)});
            xbee_connected = false;
        }
    })
    res.send("success");
})

app.post("/xbee/disconnect", function(req,res){
    if(xbee_connected === true){
        xbeeShell.kill();
        io.to('Data-link Room').emit('log-data', {data:"Xbee Disconnected"});
        xbee_connected = false;
    }
    res.send('success');
})


/**
 * Used to clear the contents of the data.csv files
 * 
 * @function reset_files
 */

function reset_files(){
    fs.writeFileSync("./public/data.csv", " ");
    console.log("started new data session");
}

io.on("connection", function(socket){
    console.log("User connected");
    socket.on("disconnect", function(socket){
        console.log("User disconnected");
    })

    socket.on("PRI", function(){
        socket.leave("ECU Room").leave("Accumulator Room").leave("Inverter Room").leave("Map Room").leave("Test Room").leave("Data-link Room");
        socket.join('Primary Room');
        console.log(socket.id + " joined Primary Room");
    })

    socket.on("ECU", function(){
        socket.leave("Primary Room").leave("Accumulator Room").leave("Inverter Room").leave("Map Room").leave("Test Room").leave("Data-link Room");
        socket.join("ECU Room");
        console.log(socket.id + " joined ECU Room");
    })

    socket.on("ACC", function(){
        socket.leave("Primary Room").leave("ECU Room").leave("Inverter Room").leave("Map Room").leave("Test Room").leave("Data-link Room");
        socket.join("Accumulator Room");
        console.log(socket.id + " joined Accumulator room");
    })

    socket.on("INV", function(){
        socket.leave("Primary Room").leave("ECU Room").leave("Accumulator Room").leave("Map Room").leave("Test Room").leave("Data-link Room");
        socket.join("Inverter Room");
        console.log(socket.id + " joined Inverter room");
    })

    socket.on("GPS", function(){
        socket.leave("Primary Room").leave("ECU Room").leave("Accumulator Room").leave("Inverter Room").leave("Test Room").leave("Data-link Room");
        socket.join("Map Room");
        console.log(socket.id + " joined Map Room");
    })

    socket.on("TEST", function(){
        socket.leave("Primary Room").leave("ECU Room").leave("Accumulator Room").leave("Inverter Room").leave("Map Room").leave("Data-link Room");
        socket.join("Test Room");
        console.log(socket.id + " joined Test Room");
    })

    socket.on("XBEE", function(){
        socket.leave("Primary Room").leave("ECU Room").leave("Accumulator Room").leave("Inverter Room").leave("Map Room").leave("Test Room");
        socket.join("Data-link Room");
        console.log(socket.id + " joined Data-link Room");
    })

    socket.on("Start_data_session", function(){
        reset_files();
    })

})

tail.on("line", function(data){
    //substring data to split into all the different metrics
    data = data.split(',');

    //Function for splitting data into the different sections here

    data1 = data.slice(0,34);
    data2 = data.slice(7,22);
    data3 = data.slice(50,96);
    data4 = data.slice(97,data.length);
    data5 = data.slice(4,6);
    
    var time = data[115]
    console.log(time)

    io.to('Primary Room').emit('primary-data', {data:data1, time:time});
    io.to('ECU Room').emit('ecu-data', {data:data2, time:time});
    io.to('Accumulator Room').emit('acc-data', {data:data3, time:time});
    io.to('Inverter Room').emit('inv-data', {data:data4, time:time});
    io.to('Map Room').emit('position-data', {data:data5, time:time});
    
    put_Kinesis_data(data)
});

tail.on("error", function(error) {
    console.log('ERROR: ', error);
});

http.listen("8080", function(){
    console.log("listening on port 8080");
});

module.exports = app; // for testing
exports.channel_configuration = channel_configuration;
