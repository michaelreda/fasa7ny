//add dependencies
var express= require('express');
var app=express();
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var DB_URI_LOCAL="mongodb://localhost:27017/protoflio";
var DB_URI =  "mongodb://admin:admin@ds147920.mlab.com:47920/fasa7ny";
var passport = require('passport');
var schedule = require('node-schedule');
var globalCTRL = require('./app/controllers/globalCTRL');


//configure app
app.use(bodyParser.urlencoded({extended:true})); //this line must be on top of app config
app.use(bodyParser.json());
var job1 = schedule.scheduleJob('59 23 * * *', globalCTRL.banDecrement);
var job2 = schedule.scheduleJob('59 23 * * 6', globalCTRL.sendNewsletter);
var job3 = schedule.scheduleJob('59 23 * * *', globalCTRL.overdueBookings);
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'kotomotoos', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//connect to local if failed to connect to mlab
mongoose.connect(DB_URI,function(err){
  if(err){
    mongoose.connect(DB_URI_LOCAL);
  }
});
require('./app/config/passport')(passport);
app.use(require('./app/routes')(passport));

// app.set('view engine', 'ejs');


//start the server
app.listen(8080,function(){
  console.log("the app is listening on port 8080");
});
