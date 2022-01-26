const express = require('express')
const expr = new express()

//par défaut seulement le GEt donc on rajoute pour gérer les éléments POST
expr.use(express.urlencoded({
    extended: true
}));


//EJS
const ejs = require('ejs')
expr.use(express.static('static'))

//router
const router = require('./routes/router');
expr.use('/', router);


var bodyParser = require('body-parser')
expr.use( bodyParser.json() );       // to support JSON-encoded bodies
expr.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
expr.listen(4000, ()=>{
  console.log('App listening on port 4000')
})