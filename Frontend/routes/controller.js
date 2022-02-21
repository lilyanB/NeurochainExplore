const axios = require('axios');
const session = require('express-session');
bodyParser = require('body-parser').json();

const express = require('express');
const expr = new express()

expr.use(express.json());
// to support URL-encoded pass by POST
expr.use(express.urlencoded({     
    extended: true
    }))

/* var session = require('express-session');
const sess = new session() */

class controller {

    static async login(req, res, next) {
        var crypto = require('crypto');
        var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
        console.log(hash);
        await axios.post('http://localhost:5000/log', { email: req.body.email , password: hash/* req.body.password */})
        .then(function (req) {
            //console.log(reponse.data.idsession);
            //console.log(req.data.error);
            //console.log(req.status);
            if (req.data.error === "200"){
                session.idsession = req.data.idsession;
                session.mail = req.data.mail;
                res.redirect('/');
            };            
        })
        .catch(function (erreur) {
            //console.log(erreur);
            res.redirect('/');
        })
    };

    static async checkSession(req, res, next) {
        //console.log(session.idsession) =ok
        await axios.post('http://localhost:6000/session', { session_id: session.idsession})
        .then(function (req) {
            console.log("sessions toujours valide")
            res.render('block_explorer.ejs') ;
            //res.redirect('/');        
        })
        .catch(function (erreur) {
            console.log(erreur);
            delete session.idsession;
            delete session.mail;
            console.log("sessions supprimé")
            res.redirect('/');
        })
    };

    static async afficheblock(req, res, next) {
        //console.log(req.body);
        await axios.post('http://localhost:7000/blocks', { debut: req.body.debut})
        .then(function (req) {
            res.render('block_explorer.ejs', {info : req.data})    
        })
        .catch(function (erreur) {
            console.log(erreur);
        })
        //res.send(req.body);
    };

}
module.exports = controller;