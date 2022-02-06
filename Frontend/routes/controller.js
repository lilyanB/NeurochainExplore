const axios = require('axios');
bodyParser = require('body-parser').json();

var session = require('express-session');
const sess = new session()

class controller {

    static async login(req, res, next) {
        await axios.post('http://localhost:5000/log', { email: req.body.email , password:req.body.password})
        .then(function (req,res) {
            //console.log(reponse.data.idsession);
            //console.log(reponse.data.mail);
            sess.idsession = req.data.idsession;
            sess.mail = req.data.mail;
            console.log(sess)
        })
        .catch(function (erreur) {
            console.log(erreur);
        })
    };

}



module.exports = controller;