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
expr.post('/test', bodyParser, (req, res) => {
    const session_idrecup = req.body.session_id
    const session_deadlinerecup = req.body.session_deadline
    //console.log(emailrecup)
    //console.log(passwordrecup)
    users.findOne({session_id: session_idrecup})
        .then(infoSession =>{
            console.log(infoSession)
            //console.log(user.email)
            if(infoSession.session_id == null){
                console.log(user)
                return res.status(400).json({ error: 'utilisateur non trouvé !'});
            }
            if(infoSession.session_id>aujourdhui){
                return res.status(400).json({ error : 'deadline dépassé !'});
            }
            if( infoSession.session_id==session_idrecup && infoSession.session_deadlinerecup==session_deadlinerecup){
                return res.status(200).json({ error :"c'est ok !"});
            }
            else{
                return res.status(500).json({ error: 'tous bug' });
            }
        })
    })