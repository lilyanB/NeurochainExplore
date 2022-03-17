const { application } = require('express');
const { isValidObjectId } = require('mongoose');
const { count, db } = require('../models/Schema');
const users = require('../models/Schema');
const blocks = require('../models/Schema2');


const express = require('express');
const expr = new express()

expr.use(express.json());
// to support URL-encoded pass by POST
expr.use(express.urlencoded({     
    extended: true
    }))

// app disponible sur le port 4000
expr.listen(7777, ()=>{
    console.log('App listening on port 7777')
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
expr.get('/blocks', bodyParser, async (req, res) => {
    console.log("recherche sur la base")
    //console.log(req.query.numero);
    let debut = parseInt(req.query.numero);
    //console.log(debut)
    const result2 = await blocks.find({ "branchPath.blockNumbers": { $gte: debut } }).sort( { 'branchPath.blockNumbers': 1 }).limit(12);
    
    let blockId = [];
    let pubkey = [];
    let signature = [];
    let blockNumber = [];

    result2.forEach(element => {
        blockId.push(element.block.header.id.data)
        pubkey.push(element.block.header.author.keyPub.rawData)
        signature.push(element.block.header.author.signature.data)
        blockNumber.push(element.branchPath.blockNumbers)
    });
    //console.log(blockId)
    res.json( {numero: req.body.debut, id: blockId, pubkey: pubkey, signature:signature, blockNumber:blockNumber} );

    })

expr.get('/stat', bodyParser, async (req, res) => {
    console.log("recherche sur la base pour stat")
    //console.log(req.query.numero);
    let debut = parseInt(req.query.numero);
    //console.log(debut)
    const result2 = await blocks.find().limit(500);
    //console.log(result2)
    let pubkey = [];
    let valeur = [];

    result2.forEach(element => {
        pubkey.push(element.block.header.author.keyPub.rawData)
        //console.log(element.block.header.author.keyPub.rawData)
        valeur.push(element.balances[0].value.value)
        //console.log(element.balances[0].value.value)
    });
    res.json( {pubkey: pubkey, valeur: valeur} );

    })

//recup le form POST
expr.post('/log', bodyParser, async (req, res) => {
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
                
                const tempsSessionenMin = 60;
                var currentDate = new Date();
                console.log(user.session_id)
                var futureDate = new Date(currentDate.getTime() + tempsSessionenMin*60000);
                var myquery = {session_id : user.session_id};
                var newvalues = {session_deadline : futureDate};
                users.updateOne(myquery, newvalues, function (err, docs) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log("Updated Docs : ", docs);
                    }
                })


                return res.status(200).json({ error : '200', idsession : user.session_id, mail : user.email});
            }
            else{
                return res.status(500).json({ error: '500' });
            }
        })
    })

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