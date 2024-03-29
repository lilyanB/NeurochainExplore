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
        //console.log(hash);
        await axios.post('http://localhost:7777/log', { email: req.body.email , password: hash/* req.body.password */})
        .then(function (req) {
            //console.log(reponse.data.idsession);
            //console.log(req.data.error);
            //console.log(req.status);
            if (req.data.error === "200"){
                session.idsession = req.data.idsession;
                session.mail = req.data.mail;
                //console.log("id " + session.idsession)
                //console.log("mail " + session.mail)
                res.redirect('/');
            };            
        })
        .catch(function (erreur) {
            //console.log(erreur);
            res.redirect('/');
        })
    };

    
    static async checkSession(req, res, next) {
        //console.log("ma session :" + session.idsession)
        await axios.post('http://localhost:7777/session', { session_id: session.idsession})
        .then(function () {
            //console.log("session good")
            return res.status(200)      
        })
        .catch(function () {
            delete session.idsession;
            delete session.mail;
            //console.log("session delete")
            return res.status(401)
        })
    };

    static async afficheblock(req, res, next) {
        //console.log(req.query);
        var numero = req.query.numero
        if(numero < 1){
            numero = 1
        }        
        await axios.get('http://localhost:7777/blocks?numero=' + numero)
        .then(function (req) {
            res.render('block_explorer.ejs', {info : req.data})    
        })
        .catch(function (erreur) {
            console.log(erreur);
        })
    };

    static async stat(req, res, next) {
        //console.log(req.query);
        var numero = req.query.numero
        if(numero < 1){
            numero = 1
        }        
        await axios.get('http://localhost:7777/stat')
        .then(function (req) {
            res.render('stat.ejs', {info : req.data})    
        })
        .catch(function (erreur) {
            console.log(erreur);
        })
    };

}
module.exports = controller;