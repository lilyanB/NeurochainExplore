const axios = require('axios');
const session = require('express-session');
bodyParser = require('body-parser').json();

/* var session = require('express-session');
const sess = new session() */

class controller {

    static async login(req, res, next) {
        await axios.post('http://localhost:5000/log', { email: req.body.email , password:req.body.password})
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
            //console.log(reponse.data.idsession);
            //console.log(req.data.error);
            //console.log(req.status);
            /* 
            if (req.data.error === "200"){
                 */
                console.log("sessions toujours valide")
                res.redirect('/');
            //};
            /* if (req.data.error === "400"){
                delete session.idsession;
                delete session.mail;
                console.log("sessions supprimé ici")
                res.redirect('/');
            };
            if (req.data.error === "500"){
                delete session.idsession;
                delete session.mail;
                console.log("sessions supprimé iciiiiiiiiiiii")
                res.redirect('/');
            }; */             
        })
        .catch(function (erreur) {
            //console.log(erreur);
            delete session.idsession;
            delete session.mail;
            console.log("sessions supprimé")
            res.redirect('/');
        })
    };

}

module.exports = controller;