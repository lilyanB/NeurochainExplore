const express = require('express');
const expr = new express()

// to support URL-encoded pass by POST
expr.use(express.urlencoded({     
    extended: true
    }))

// app disponible sur le port 4000
expr.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

const axios = require('axios');

axios.get('http://35.181.125.1:8001/api/e2708c6/wallets')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });