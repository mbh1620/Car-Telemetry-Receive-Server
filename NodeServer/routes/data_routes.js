/**
 * @file
 */

var express = require('express');
var router = require('express').Router();

//================================================
//              Data Routes
//================================================

/**
 * File contains the routes for the data dashboards for primary, ecu, inverter, acumulator and position.
 * 
 * Each get route is used to view a different channel of data from the car.
 * 
 * @namespace
 * @name DataRoutes
 * @author Matthew Haywood
 */

//================================================
//              Primary Route
//================================================

/**
 * Primary get route is for the primary data to look at a glance to see whether the various components of the car are working. 
 * @namespace
 * @name DataRoutes.Primary
 */

router.get("/primary", function(req, res){
    /** Serve the primary data dashboard to the user.
     * @memberof DataRoutes.Primary
     * @function
     * @name get
     * @param {String} "/primary" using the '/primary' url 
     * @instance
     */
    res.render("primary-dash.ejs");
})

//================================================
//              ECU Route
//================================================
/**
 * ECU get route is for the ECU data dashboard. 
 * @namespace
 * @name DataRoutes.ECU
 */

router.get("/ecu", function(req, res){
    /** Serve the ECU data dashboard to the user.
     * @memberof DataRoutes.ECU
     * @function
     * @name get
     * @param {String} "/ecu" using the '/ecu' url 
     * @instance
     */
    res.render("ecu-data-1.ejs");
})

//================================================
//              Inverter Route
//================================================
/**
 * Inverter get route is for the Inverter data dashboard. 
 * @namespace
 * @name DataRoutes.Inverter
 */

router.get("/inverter", function(req, res){
    /** Serve the inverter data dashboard to the user.
     * @memberof DataRoutes.Inverter
     * @function
     * @name get
     * @param {String} "/inverter" using the '/inverter' url 
     * @instance
     */
    res.render("inverter-page.ejs");
})

//================================================
//              Accumulator Route
//================================================
/**
 * Accumulator get route is for the Accumulator data dashboard. 
 * @namespace
 * @name DataRoutes.Accumulator
 */

router.get("/accum", function(req,res){
     /** Serve the accumulator data dashboard to the user.
     * @memberof DataRoutes.Accumulator
     * @function
     * @name get
     * @param {String} "/accum" using the '/accum' url 
     * @instance
     */
    res.render("accu-page.ejs");
})

//================================================
//              Position Route
//================================================
/**
 * Position get route is for the Position data dashboard. 
 * @namespace
 * @name DataRoutes.Position
 */

router.get("/gps_map_1", function(req,res){
    /** Serve the position data dashboard to the user.
     * @memberof DataRoutes.Position
     * @function
     * @name get
     * @param {String} "/gps_map_1" using the '/gps_map_1' url 
     * @instance
     */
    res.render("gps-map-page1.ejs");
})

module.exports = router;



