const { Router } = require("express");
const router = new Router();

const express = require('express')
const expr = new express()

const controller = require("./controller.js");

router.get('/',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'dist/index.html'))
    res.render('login.ejs') ;
})

router.get('/explore',(req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'dist/about.html'))
    res.render('block_explorer.ejs') ;
  })

router
    .route("/info")
    .post(controller.login)
;


module.exports = router;