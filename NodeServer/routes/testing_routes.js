/**
 * @file
 */

var express = require('express');
var router = require('express').Router();
var {spawn} = require('child_process');
var path = require('path');
let {PythonShell} = require('python-shell');

var pyshell;



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
    res.render("testing.ejs");
})

//================================================
//             Unit Testing Mocha.js
//================================================


module.exports = router;


