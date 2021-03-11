/**
 * @file
 */

var express = require('express');
var router = require('express').Router();
var {spawn} = require('child_process');
var path = require('path');

var testing_status = false;


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
    res.render("testing.ejs", { testing_status: testing_status });
})

router.post("/testing/start", function (req, res) {
    /**
    * Start the python script. The python script will start generating the data.
    * @memberof TestingRoutes.PythonScripts
    * @function
    * @name post
    * @param '/testing/start' The url
    * @instance
    */
    python = spawn('python', ['./test.py', process.cwd()]);
    testing_status = true;
    res.send("success");
})

router.post("/testing/stop", function (req, res) {
    /**
    * Stop the python script.
    * @memberof TestingRoutes.PythonScripts
    * @function
    * @name post
    * @param '/testing/stop' The url
    * @instance
    */
    python.kill();
    testing_status = false;
    res.send('success');
})

//================================================
//             Unit Testing Mocha.js
//================================================


module.exports = router;


