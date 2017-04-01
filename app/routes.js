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


////////////kareem///////////////////


//exporting to be used in server.js
module.exports = Router;
