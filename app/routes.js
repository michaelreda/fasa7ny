//add dependencies
var express= require('express');
var Router = express.Router();
var mongoose = require('mongoose');


var userCTRL = require('./controllers/userCTRL');
var serviceProviderCTRL = require('./controllers/serviceProviderCTRL');
var visitorCTRL = require('./controllers/visitorCTRL');

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
Router.post('/apply_sp', serviceProviderCTRL.createServiceProviderAccount);
Router.post('/continue_sp_creation', serviceProviderCTRL.createServiceProvider);

//1.3  filter activities as a visitor and moving back and forth each 10 activities
Router.get('/get_filtered_activities', visitorCTRL.filterActivitiesBy);
Router.get('/get_filtered_activities_next', visitorCTRL.filterActivitiesByNext);
Router.get('/get_filtered_activities_prev', visitorCTRL.filterActivitiesByPrev);




////////////reda///////////////////


////////////morcus///////////////////


////////////sherrie///////////////////


//2.1.3 log out
Router.get('/logout', function(req, res){
    req.logout();
    req.session.regenerate(function(err){});
    res.redirect('/');
  });

////////////youssef///////////////////


////////////andrea///////////////////


////////////mariam///////////////////


// Router.get('/', function(req, res) {
//     // Display the Login page with any flash message, if any
//     res.render('loginpage', { message: req.flash('message') });
//   });

//   /* Handle Login POST */
//   Router.post('/', passport.authenticate('login', {
//     successRedirect: '/',
//     failureRedirect: '/',
//     failureFlash : true
//   }));

////////////kareem///////////////////

//exporting to be used in server.js
module.exports = Router;
