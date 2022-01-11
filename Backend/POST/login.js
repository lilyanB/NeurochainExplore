const { application } = require('express');
const { isValidObjectId } = require('mongoose');
const { count } = require('../models/Schema');
const users = require('../models/Schema');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;


const express = require('express');
const expr = new express()

// to support URL-encoded pass by POST
expr.use(express.urlencoded({     
    extended: true
    }))

// app disponible sur le port 4000
expr.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

//connect to DB
const mongoose = require('mongoose');
const { exit } = require('process');
mongoose.connect('mongodb+srv://test:test@cluster0.sodaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => {
    console.log('Connexion success')
}).catch((error) => {
    console.log(error);
})


//recup le form POST
expr.post('/submit-form', (req, res) => {
    //const email = req.body.email
    //const password = req.body.password
    const email = "lbastien"
    const password = "e2HjmPS6EM"

    const emailBD = await tx.find({ "blockId.data" : result.block.header.id.data});
    const passwordBD = await tx.find({ "blockId.data" : result.block.header.id.data});


    res.end()
    })