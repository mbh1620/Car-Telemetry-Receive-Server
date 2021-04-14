var mongoose = require('mongoose');


//-------------------------------------------------------------
//                      dataSession model
//-------------------------------------------------------------

//The data session model will be used to create data sessions that can be stored in a database and retrieved at a later date

var dataSessionSchema = new mongoose.Schema({
    name: String,
    TrackName: String,
    TrackStartLine: Array,
    dateCreated: Date,
    //Object for the data 
    PRIData: Array,             //PRI --> primary data
    ECUData: Array,             //ECU --> ecu data
    ACCData: Array,             //ACC --> accumulator data
    INVData: Array,             //INV --> inverter data --> refer to ../public/InverterDataLabels.csv to see labels for each value
    POSData: Array,             //POS --> position data
    size: Number
    //NumberOfLaps: Number,
    //TimeOfLaps: Array
})

module.exports = mongoose.model("DataSession", dataSessionSchema);