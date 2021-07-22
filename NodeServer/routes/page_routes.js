//================================================
//             Main Page Display Routes
//================================================

var router = require('express').Router();

//================================================
//             Config Page GET Route
//================================================

/*
GET route for displaying config-page.ejs
*/

router.get("/config", function(req,res){
    res.render("config-page.ejs");
})

//================================================
//             Instruction page GET route
//================================================

router.get("/instructions", function(req,res){
    res.render("instructions.ejs");
})

//================================================
//             data-link page GET route
//================================================

router.get("/data-link", function(req,res){
    res.render("data-link.ejs");
})

//================================================
//     session-save page GET route (not needed now)
//================================================

router.get("/session-saver", function(req,res){
    res.render("session-saver.ejs");
})

//================================================
//     
//================================================

module.exports = router;