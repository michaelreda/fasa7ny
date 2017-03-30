//add dependencies
var express= require('express');
var app=express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var DB_URI="mongodb://localhost:27017/protoflio";

//configure app
app.use(bodyParser.urlencoded({extended:false})); //this line must be on top of app config
app.use(require('./app/routes'));
mongoose.connect(DB_URI);

//start the server
app.listen(8080,function(){
  console.log("the app is listening on port 8080");
});
