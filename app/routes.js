//add dependencies
var express= require('express');
var mongoose = require('mongoose');
var Router = express.Router();

//exporting to be used in server.js
module.exports = function(passport){



var visitorCTRL= require('./controllers/visitorCTRL');
var userCTRL= require('./controllers/userCTRL');
var serviceProviderCTRL = require('./controllers/serviceProviderCTRL');
//var activityCTRL = require('./controllers/activityCTRL');


// router configuration
Router.get('/',function(req,res){
  res.send("hello world");
})

Router.get('/test',function(req,res){
  res.send("bye world");
})

////////////waseem///////////////////

//2.6 comparison
/*Router.post('/comparison', userCTRL.getFirstListOfChoices);
Router.post('/second_choice', userCTRL.getSecondListOfChoices);
Router.get('/compare_serviceProviders', userCTRL.getServiceProviderToCompare);
Router.get('/compare_activities', userCTRL.getActivitiesToCompare);

//1.10 apply as a service provider
Router.post('/apply_sp', serviceProviderCTRL.createServiceProvider);
*/


////////////reda///////////////////


////////////morcus///////////////////


////////////sherrie///////////////////
//Router.get('/user_Login',userCTRL.login );
Router.post('/user_Login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/test',
    failureFlash : true
  }));

////////////youssef///////////////////


////////////andrea///////////////////


////////////mariam///////////////////


////////////kareem///////////////////



return Router;}
