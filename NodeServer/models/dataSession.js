var mongoose = require('mongoose');


//-------------------------------------------------------------
//                      dataSession model
//-------------------------------------------------------------

//The data session model will be used to create data sessions that can be stored in a database and retrieved at a later date

var dataSessionSchema = new mongoose.Schema({
    name: String, 
    dateCreated: Date,
    //Object for the data 
    data: [{
        time: Number,
        speed: Number,
        battery_voltage: Number
    }]
})