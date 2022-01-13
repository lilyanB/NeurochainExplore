const express = require('express')
const expr = new express()

//par défaut seulement le GEt donc on rajoute pour gérer les éléments POST
expr.use(express.urlencoded({
    extended: true
}));



//EJS
const ejs = require('ejs')
//expr.set('view engine', 'ejs')

var bodyParser = require('body-parser')
expr.use( bodyParser.json() );       // to support JSON-encoded bodies
expr.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
expr.listen(4000, ()=>{
  console.log('App listening on port 4000')
})

expr.get('/',(req,res)=>{
  //res.sendFile(path.resolve(__dirname, 'dist/index.html'))
  res.render('block_explorer.ejs') ;
  })