const express = require('express');
const expr = new express()

const fs = require('fs');
const axios = require('axios');
const window = require('window');

// to support URL-encoded pass by POST
expr.use(express.urlencoded({     
    extended: true
    }))

// app disponible sur le port 4000
expr.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

console.log('    ')

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
    })
    .catch(function (error) {
      console.log(error);
    });


const publicKeytra = donné.data;
const privateKeytra = donné.data;
console.log(publicKeytra);
console.log(privateKeytra);
var publicKeytrad = JSON.parse(publicKeytra).publicKey;
var privateKeytrad = JSON.parse(privateKeytra).privateKey;
console.log(publicKeytrad);
console.log(privateKeytrad);

const URl = 'http://35.181.125.1:8001/api/e2708c6/wallets/' + donné + '/balance'
const donné1 = axios.get(URL)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });