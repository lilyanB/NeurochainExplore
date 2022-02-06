const { Router, application } = require("express");
const router = new Router();

const express = require('express')
const expr = new express()

var session = require('express-session');
const sess = new session()

const controller = require("./controller.js");

var sessi
var oneDay = 60

expr.use(session({
  secret: "secret",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
}))

router.get('/',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'dist/index.html'))
    sessi = req.session;
    if (typeof sessi == 'undefined') {
      res.render('login.ejs');
    }else{
      res.render('block_explorer.ejs') ;
    }
})

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
  });

router
    .route("/log")
    .post(controller.login , function(req, res) {
      console.log(req);
      console.log(res);
      res.redirect("login.ejs")
    });

module.exports = router;