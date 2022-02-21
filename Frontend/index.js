const express = require('express')
const expr = new express()
expr.use(express.json());
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

expr.listen(4000, ()=>{
  console.log('App listening on port 4000')
})