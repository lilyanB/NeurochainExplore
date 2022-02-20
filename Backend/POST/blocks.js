const { application } = require('express');
const { isValidObjectId } = require('mongoose');
const { count, db } = require('../models/Schema');
const users = require('../models/Schema');
const blocks = require('../models/Schema2');


const express = require('express');
const expr = new express()

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
expr.post('/blocks', bodyParser, async (req, res) => {
    console.log("recherche sur la base")

    //const inputIdTx = req.body.IdTx;
    //console.log(inputIdTx);
    const result = await blocks.findOne();

    const result2 = await blocks.find().sort( { 'branchPath.blockNumbers': 1 }).limit(10);

    /* 
    result2.forEach(visible());

    function visible(data) {
        console.log(data)
        const blockId = data.block.header.id.data
        const pubkey = data.blok.header.author.keypub.rawData
        const signature = data.blok.header.author.signature.rawData 
    }*/

    const blockId = result2[5].block.header.id.data
    const pubkey = result2[0].blok.header.author.keypub.rawData
    const signature = result2[0].blok.header.author.signature.rawData



    //const bonId = await tx.find({ "blockId.data" : result.block.header.id.data});
    //console.log(result._id);
    /*
    console.log(bonId);
    const tableau = bonId[0].transaction.outputs;
    console.log("ceci est le tableau : " + tableau);
    const nombre = await tx.count({"blockId.data" : result.block.header.id.data}); 
    console.log("ceci est le nombre : " + nombre);


    tx.count({ "blockId.data" : result.block.header.id.data }, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Number of documents in this ID " + result);
        }
      });
    */
    /* const bonId = await tx.aggregate([
        {$match: { _id: ObjectId('6192977acec8d10001488e33') }},
        {$project:
            //{Number: { $cond: { if: { $isArray: "$outputs" }, then: { $size: "$outputs" }, else: "NA"} }
            {nombre: {$size: "$transaction.outputs"}
         }}
     ] ) */

    res.json( { result: "result", base: blockId} );

    })