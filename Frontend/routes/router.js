const { Router, application } = require("express");
const router = new Router();
const controller = require("./controller.js");


const { Session } = require("express-session");
var session = require('express-session');
const express = require('express');
const expr = new express()
expr.use(session({
  secret: "secret",
  saveUninitialized:true,
  cookie: { maxAge: 60*1000 },
  resave: false 
}))

async function checksess (req, res, next) {
  //console.log("middelware")
  await controller.checkSession(req,res).then(function () {
    //console.log(res.statusCode)
    if(res.statusCode == 200){
      next()
    }else{
      res.redirect('/');
    }              
})
};

router.get('/',(req,res)=>{
  if (typeof session.idsession == 'undefined') {
    //console.log("login")
    res.render('login.ejs');
  }else{
    //console.log("already log")
    res.redirect('/afficheblock?numero=1');
    //console.log("my session " + session.idsession)
  }
})

router
    .route("/log")
    .post(controller.login , function(req, res) {
      console.log(req)
    });

router.use(checksess);

// Logout endpoint
router.get("/logout", function (req, res) {
  delete session.idsession
  delete session.mail
  res.redirect("/")
});

router
    .route("/check")
    .get(controller.checkSession , function(req, res) {
      console.log(" req : " + req)
      console.log(" res : " + res)
    });

bodyParser = require('body-parser').json();

router
    .route("/afficheblock")
    .get(controller.afficheblock , function(req, res) {
      console.log(req)
    });

  
module.exports = router;