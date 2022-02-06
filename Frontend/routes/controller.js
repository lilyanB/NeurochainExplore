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
            if (req.data.error === "400") {
                console.log("erreur 400")
            };
            if (req.data.error === "500") {
                console.log("tous bug")
            };
            
        })
        .catch(function (erreur) {
            console.log(erreur);
            res.redirect('/');
        })
    };

}

module.exports = controller;