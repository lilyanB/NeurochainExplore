const axios = require('axios');

async function login(mail,password) {
    const reponse = await axios({
        method: 'POST',
        url: 'url',
        data: mail, password
    })
    .then(function (reponse) {
        console.log(reponse);
        //return reponse.data
    })
    .catch(function (erreur) {
        //console.log(erreur);
    });
}


