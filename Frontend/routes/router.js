const { Router, application } = require("express");
const router = new Router();

const express = require('express');
const { Session } = require("express-session");
const expr = new express()

var session = require('express-session');

const controller = require("./controller.js");

expr.use(session({
  secret: "secret",
  saveUninitialized:true,
  cookie: { maxAge: 60*1000 },
  resave: false 
}))


router.get('/',(req,res)=>{
    if (typeof session.idsession == 'undefined') {
      res.render('login.ejs');
    }else{
      console.log("ma session " + session.idsession)
      res.render('block_explorer.ejs') ;
    }
})

// Logout endpoint
router.get("/logout", function (req, res) {
  delete session.idsession
  delete session.mail
  res.redirect("/")
});

router
    .route("/log")
    .post(controller.login , function(req, res) {
      console.log(req)
    });

module.exports = router;