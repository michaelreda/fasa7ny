//add dependencies
var express= require('express');
var app=express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
//var DB_URI="mongodb://localhost:27017/protoflio";
var DB_URI =  "mongodb://admin:admin@ds147920.mlab.com:47920/fasa7ny";
var passport = require('passport');
var schedule = require('node-schedule');
var globalCTRL = require('./app/controllers/globalCTRL');

//configure app
app.use(bodyParser.urlencoded({extended:true})); //this line must be on top of app config
app.use(bodyParser.json());
var job = schedule.scheduleJob('59 23 * * *', globalCTRL.banDecrement);
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'kotomotoos', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(DB_URI);
require('./app/config/passport')(passport);

app.use(require('./app/routes')(passport));


//start the server
app.listen(8080,function(){
  console.log("the app is listening on port 8080");
});
