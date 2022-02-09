const { application } = require('express');
const { isValidObjectId } = require('mongoose');
const { count } = require('../models/Schema');
const users = require('../models/Schema');


const express = require('express');
const expr = new express()

// to support URL-encoded pass by POST
expr.use(express.urlencoded({     
    extended: true
    }))

// app disponible sur le port 4000
expr.listen(5000, ()=>{
    console.log('App listening on port 5000')
})


//connect to DB
const mongoose = require('mongoose');
const { exit } = require('process');
mongoose.connect('mongodb+srv://test:test@cluster0.sodaz.mongodb.net/loginNeurochain?retryWrites=true&w=majority').then(() => {
    console.log('Connexion success')
}).catch((error) => {
    console.log(error);
})

bodyParser = require('body-parser').json();

//recup le form POST
expr.post('/log', bodyParser, (req, res) => {
    console.log("recherche sur la base")
    const emailrecup = req.body.email
    const passwordrecup = req.body.password
    //console.log(emailrecup)
    //console.log(passwordrecup)
    users.findOne({email: emailrecup})
        .then(user =>{
            console.log(user)
            //console.log(user.email)
            if(user == null){
                console.log(user)
                return res.status(400).json({ error: '400'});
            }
            if(user.password!=passwordrecup){
                return res.status(400).json({ error : '400'});
            }
            if( user.email==emailrecup && user.password==passwordrecup){
                return res.status(200).json({ error : '200', idsession : user.session_id, mail : user.email});
            }
            else{
                return res.status(500).json({ error: '500' });
            }
        })
    })