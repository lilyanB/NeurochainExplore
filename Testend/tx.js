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

const clepub2 = fs.readFileSync('wallet2.pub', function read(err, data) {
  if (err) {
      throw err;
  }
  const priv = data;
  console.log(priv);
  
});

const clepriv2 = fs.readFileSync('wallet2.priv', function(err, data) {
  if (err) {
      throw err;
  }
  const content = data;
  console.log(content);
});

console.log("public key 2 is : " + clepub2);
console.log('    ')
console.log("private key 2 is : " + clepriv2);

function tradkey () {
  return new Promise(function (response, reject) {
    axios.post('http://35.181.125.1:8001/api/e2708c6/wallets', {publicKey: clepub,privateKey: clepriv,})
      .then(function (res) {
        response(res);
      })
      .catch(function (err) {
        reject(new Error('tradkey failed because ' + err));
      })
    });
  }

function tradkey2 () {
  return new Promise(function (response, reject) {
    axios.post('http://35.181.125.1:8001/api/e2708c6/wallets', {publicKey: clepub2,privateKey: clepriv2,})
      .then(function (res) {
        response(res);
      })
      .catch(function (err) {
        reject(new Error('tradkey failed because ' + err));
      })
    });
  }

function balance(key) {
  return new Promise(function (response, reject) {
    axios.get('http://35.181.125.1:8001/api/e2708c6/wallets/' + key + '/balance')
      .then(function (res) {
        console.log("votre balance est de : " + res.data.balance)
        response(res);
      })
      .catch(function (err) {
        reject(new Error('balance failed because ' + err));
      })
    });
}

tradkey()
  .then(function (answer) {
    //console.log('valeur retournée par tradkey():', answer.data);
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

tradkey2()
.then(function (answer) {
  //console.log('valeur retournée par tradkey():', answer.data);
  const allKey = answer.data
  var publicKeytrad = JSON.parse(allKey).publicKey;
  var privateKeytrad = JSON.parse(allKey).privateKey;
  console.log("public key 2 is :" + publicKeytrad)
  console.log('    ')
  console.log("private key 2 is : " + privateKeytrad)
  balance(publicKeytrad)
})
.catch(function (err) {
  console.error('meaningOfLife() a rapporté une erreur:', err);
});




/* 
Plus de précisions pour les étapes [1-3]:
Créer un wallet A et un wallet B
Check que les wallets ont bien un balance à 0
Récupérer les bots dispo et effectuer une transaction de la part du “chosen” bot vers wallet A puis wallet B pour les fournir */

function giveBot() {
  return new Promise(function (response, reject) {
    axios.get('http://35.181.125.1:8001/api/e2708c6/bots')
      .then(function (res) {
        var data = res.data;
        //console.log(data)
        Object.entries(data).forEach(
            ([key, val]) => {
            //([clé, valeur]) => console.log(valeur.botRole)
            if (val.botRole === "chosen"){
              //console.log(val)
              response(val);
            }
            }
        )
      })
      .catch(function (err) {
        reject(new Error('recherche de chosen impossible ' + err));
      })
    });
  }

giveBot()
  .then(function (answer) {
    const infobot = answer
    const publicKeybot = infobot.publicKey;
    const privateKeybot = infobot.privateKey;
    console.log("public key of bot is : " + publicKeybot)
    console.log("public key of bot is : " + privateKeybot)
    tradkey()
      .then(function (answer) {
        //console.log('valeur retournée par meaningOfLife():', answer.data);
        const allKey = answer.data
        var publicKeytrad = JSON.parse(allKey).publicKey;
        riseBalance(publicKeybot,publicKeytrad, 10, "init", 1)
        //balance(publicKeytrad)
      })
  })
  .catch(function (err) {
    console.error(err);
  });


function riseBalance(aPubKey,rPubKey,val,data,fee) {
  return new Promise(function (response, reject) {
    axios.post('http://35.181.125.1:8001/api/e2708c6/transactions', {authorPublicKey: aPubKey, recipientPublicKey: rPubKey, value: val, data: data, fee:fee})
      .then(function (res) {
        console.log(res)
        response(res);
      })
      .catch(function (err) {
        reject(new Error(err));
      })
    });
}


function tx(aPubKey,rPubKey,val,data,fee) {
  return new Promise(function (response, reject) {
    axios.post('http://35.181.125.1:8001/api/e2708c6/transactions', {authorPublicKey: aPubKey, recipientPublicKey: rPubKey, value: val, data: data, fee:fee})
      .then(function (res) {
        console.log(res)
        response(res);
      })
      .catch(function (err) {
        reject(new Error(err));
      })
    });
}

