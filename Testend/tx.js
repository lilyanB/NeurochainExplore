const express = require('express');
const expr = new express()

const fs = require('fs');
const axios = require('axios');
const window = require('window');

// to support URL-encoded pass by POST
expr.use(express.urlencoded({     
    extended: true
    }))

const clepub = fs.readFileSync('wallet.pub', function read(err, data) {
    if (err) {
        throw err;
    }
    const priv = data;
    console.log(priv);
    
});

const clepriv = fs.readFileSync('wallet.priv', function(err, data) {
    if (err) {
        throw err;
    }
    const content = data;
    console.log(content);
});

console.log("public key is : " + clepub);
console.log('    ')
console.log("private key is : " + clepriv);

/*

const donné = axios.post('http://35.181.125.1:8001/api/e2708c6/wallets', {
      publicKey: clepub,
      privateKey: clepriv,
    })
    .then(function (response) {
      const publicKeytra = response.data;
      const privateKeytra = response.data;
      var publicKeytrad = JSON.parse(publicKeytra).publicKey;
      var privateKeytrad = JSON.parse(privateKeytra).privateKey;
      console.log(publicKeytrad);
      console.log(privateKeytrad);
      return(publicKeytrad,privateKeytrad)
    })
    .catch(function (error) {
      console.log(error);
    })

console.log(donné);


const donné12 = axios.post('http://35.181.125.1:8001/api/e2708c6/wallets', {
      publicKey: clepub,
      privateKey: clepriv,
    }, { synchronous: true })
    .then(function (response){
      return(response)
    })

console.log(donné12)
*/

/* async function getDonnees(){
  try {
      const resp = await axios.post('http://35.181.125.1:8001/api/e2708c6/wallets', {
        publicKey: clepub,
        privateKey: clepriv,
      });
      console.log(resp);
  } catch (err) {
      console.error(err);
  }
};
getDonnees().then(console.log); */

function tradkey () {
  return new Promise(function (response, reject) {
    axios.post('http://35.181.125.1:8001/api/e2708c6/wallets', {publicKey: clepub,privateKey: clepriv,})
      .then(function (res) {
        response(res);
      })
      .catch(function (err) {
        // la requête db a échoué => appeler reject en incluant l'erreur
        reject(new Error('meaningOfLife failed because ' + err));
      })
    });
  }

tradkey()
  .then(function (answer) {
    //console.log('valeur retournée par meaningOfLife():', answer.data);
    const allKey = answer.data
    var publicKeytrad = JSON.parse(allKey).publicKey;
    var privateKeytrad = JSON.parse(allKey).privateKey;
    console.log("public key is :" + publicKeytrad)
    console.log('    ')
    console.log("private key is : " + privateKeytrad)
    balance(publicKeytrad)
  })
  .catch(function (err) {
    console.error('meaningOfLife() a rapporté une erreur:', err);
  });

function balance(key) {
  return new Promise(function (response, reject) {
    axios.get('http://35.181.125.1:8001/api/e2708c6/wallets/' + key + '/balance')
      .then(function (res) {
        console.log("votre balance est de : " + res.data.balance)
        response(res);
      })
      .catch(function (err) {
        // la requête db a échoué => appeler reject en incluant l'erreur
        reject(new Error('meaningOfLife failed because ' + err));
      })
    });
}

/*
const URl = 'http://35.181.125.1:8001/api/e2708c6/wallets/' + donné + '/balance'
const donné1 = axios.get(URL)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
*/