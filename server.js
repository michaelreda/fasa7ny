//add dependencies
var express= require('express');
var app=express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var DB_URI="mongodb://localhost:27017/protoflio";
var passport = require('passport');

//configure app

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended:false})); //this line must be on top of app config
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./app/routes'));
mongoose.connect(DB_URI);

//start the server
app.listen(8080,function(){
  console.log("the app is listening on port 8080");
});
