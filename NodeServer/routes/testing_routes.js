/**
 * @file
 */

var express = require('express');
var router = require('express').Router();
var {spawn} = require('child_process');
var path = require('path');
let {PythonShell} = require('python-shell');

var AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-1'
})
var dynamodb = new AWS.DynamoDB({region: 'eu-west-1'});

var pyshell;
var xbeeShell;



//================================================
//              Testing Routes
//================================================

/**
 * File contains the testing routes
 * @namespace
 * @name TestingRoutes
 * @author Matthew Haywood
 */

//================================================
//           Python Testing Scripts
//================================================

/**
 * Testing scripts written in python.
 * @namespace
 * @name TestingRoutes.PythonScripts
 */

router.get("/testing", function (req, res) {
    /**
    * Serve the testing page to the user.
    * @memberof TestingRoutes.PythonScripts
    * @function
    * @name get
    * @param '/testing' The url
    * @instance
    */
   //Add code here to display kinesis streams
    dynamodb.listTables(function(err,data){
        if(err){
            console.log(err)
        } else {
            console.log(data)
            res.render("testing.ejs", {tables: data})
        }
    })
})

//================================================
//             Unit Testing Mocha.js
//================================================


module.exports = router;


