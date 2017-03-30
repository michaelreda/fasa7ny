//add dependencies
var express= require('express');
var Router = express.Router();
var mongoose = require('mongoose');

var visitorCTRL= require('./controllers/visitorCTRL');
var userCTRL= require('./controllers/userCTRL');
var activityCTRL = require('./controllers/activityCTRL');


// router configuration
Router.get('/',function(req,res){
  res.send("hello world");
})


////////////waseem///////////////////

//2.6 comparison
Router.post('/comparison', userCTRL.getFirstListOfChoices);
Router.post('/second_choice', userCTRL.getSecondListOfChoices);
Router.get('/compare_serviceProviders', userCTRL.getServiceProviderToCompare);
Router.get('/compare_activities', userCTRL.getActivitiesToCompare);

//1.10 apply as a service provider
Router.post('/apply_sp', serviceProviderCTRL.createServiceProvider);



////////////reda///////////////////


////////////morcus///////////////////


////////////sherrie///////////////////
Router.get('/user_Login',userCTRL.login );
Router.post('/user_Login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash : true
  }));

//2.1.3 log out
Router.get('/logout', function(req, res){
    req.logout();
    req.session.regenerate(function(err){});
    res.redirect('/');
  });

////////////youssef///////////////////


////////////andrea///////////////////


////////////mariam///////////////////


////////////kareem///////////////////


//exporting to be used in server.js
module.exports = Router;
