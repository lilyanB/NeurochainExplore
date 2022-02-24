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
expr.listen(7000, ()=>{
    console.log('App listening on port 7000')
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
    console.log(req.query.numero);
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