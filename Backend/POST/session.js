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
expr.listen(6000, ()=>{
    console.log('App listening on port 6000')
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
expr.post('/session', bodyParser, (req, res) => {
    const session_idrecup = req.body.session_id
    //const session_deadlinerecup = req.body.session_deadline
    //console.log(session_idrecup)
    //console.log(session_deadlinerecup)
    users.findOne({session_id: session_idrecup})
        .then(infoSession =>{
            //console.log("info sesions : " + infoSession)
            //console.log("info sesions id : " + infoSession.session_id)
            const nouvelleDate = new Date()
            //console.log("info date : " + nouvelleDate)
            if(infoSession == null){
                console.log(infoSession)
                return res.status(400).json({ error: '400'});
            }
            if(infoSession.session_deadline<nouvelleDate){
                console.log("deadlinedépassé " +infoSession)
                return res.status(400).json({ error : '400'});
            }
            if(infoSession.session_id==session_idrecup && infoSession.session_deadline>nouvelleDate){
                console.log("sessionvalide " +infoSession)
                return res.status(200).json({ error : '200'});
            }
            else{
                console.log("erreur : " +infoSession)
                return res.status(500).json({ error: '500' });
            }
        })
    })