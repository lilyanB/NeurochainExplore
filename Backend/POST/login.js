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
expr.post('/test', (req, res) => {
    //const emailrecup = req.body.email
    //const passwordrecup = req.body.password
    const emailrecup = "lbastien"
    const passwordrecup = "e2HjmPS6EM"
    console.log(emailrecup)
    console.log(passwordrecup)
    users.findOne({email: emailrecup})
        .then(user =>{
            if(!user){
                console.log(user)
                return res.status(400).json({ error: 'utilisateur non trouvé !'});
            }
            bcrypt.compare(passwordrecup, user.password)
                .then(valid =>{
                    if(!valid) {
                        return res.status(400).json({ error : 'Mot de passe incorrect !'});
                    }
                    res.status(200)
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    })