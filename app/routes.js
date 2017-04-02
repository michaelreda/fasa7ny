//add dependencies
var express= require('express');
var mongoose = require('mongoose');

var Router = express.Router();
//var bodyParser = require('body-parser').json();
//exporting to be used in server.js
module.exports = function(passport){

var visitorCTRL= require('./controllers/visitorCTRL');
var userCTRL= require('./controllers/userCTRL');
var serviceProviderCTRL = require('./controllers/serviceProviderCTRL');
var adminCTRL= require('./controllers/adminCTRL');
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

Router.post('/comparison', userCTRL.getFirstListOfChoices);
Router.post('/second_choice', userCTRL.getSecondListOfChoices);
Router.get('/compare_serviceProviders', userCTRL.getServiceProviderToCompare);
Router.get('/compare_activities', userCTRL.getActivitiesToCompare);

//1.10 apply as a service provider
Router.post('/create_sp_acc', serviceProviderCTRL.createServiceProviderAccount);
Router.post('/continue_sp_creation', serviceProviderCTRL.createServiceProvider);

//1.3  filter activities as a visitor and moving back and forth each 10 activities
Router.get('/get_filtered_activities', visitorCTRL.filterActivitiesBy);
Router.get('/get_filtered_activities_next', visitorCTRL.filterActivitiesByNext);
Router.get('/get_filtered_activities_prev', visitorCTRL.filterActivitiesByPrev);






////////////reda///////////////////
Router.post('/add_activity', serviceProviderCTRL.addActivity);
Router.post('/update_activity', serviceProviderCTRL.updateActivity);
Router.post('/delete_activity', serviceProviderCTRL.deleteActivity);
Router.post('/reschedule_activity', serviceProviderCTRL.rescheduleActivity);
Router.post('/sp_login', serviceProviderCTRL.serviceProviderLogin);
Router.post('/view_add_offer', serviceProviderCTRL.viewAddOffer);
Router.post('/add_offer', serviceProviderCTRL.addOffer);
Router.post('/delete_offer', serviceProviderCTRL.deleteOffer);
Router.post('/update_offer', serviceProviderCTRL.updateOffer);
Router.post('/apply_to_golden', serviceProviderCTRL.applyToGolden);
////////////morcus///////////////////


////////////sherrie///////////////////
//Router.get('/user_Login',userCTRL.login );
Router.post('/user_Login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/test',
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

//1.2 view service providers
Router.get('/view_all_service_providers', visitorCTRL.viewAllServiceProviders);
Router.post('/view_service_provider', visitorCTRL.viewServiceProvider);
//1.7 view FAQ
Router.get('/view_FAQ', visitorCTRL.viewFAQ);
//1.4 user registration


//2.10 user wishlists
Router.post('/add_to_wishlist', userCTRL.userAddToWishList);
Router.post('/drop_from_wishlist', userCTRL.userDropFromWishList);
//4.7 messages
Router.get('/view_all_chats', adminCTRL.viewAllChats);
Router.post('/view_chat_history', adminCTRL.viewChatMessages);




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



return Router;}
