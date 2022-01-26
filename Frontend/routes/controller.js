const axios = require('axios');
bodyParser = require('body-parser').json();

class controller {

    static async login(req, res, next) {
        await axios.post('http://localhost:5000/info', { email: req.body.email , password:req.body.password})
        .then(function (reponse) {
            //console.log(reponse);
            return reponse.data
        })
        .catch(function (erreur) {
            console.log(erreur);
        })
    };

}

module.exports = controller;