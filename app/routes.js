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


// router configuration
Router.get('/',function(req,res){
  res.send("hello world");
})

Router.get('/test',function(req,res){
  res.send("bye world");
})

////////////waseem///////////////////

//2.6 comparison

Router.get('/comparison', userCTRL.getFirstListOfChoices);
Router.post('/second_choice', userCTRL.getSecondListOfChoices);
Router.post('/compare_serviceProviders', userCTRL.getServiceProviderToCompare);
Router.post('/compare_activities', userCTRL.getActivitiesToCompare);

//1.10 apply as a service provider
// Router.post('/apply_sp', serviceProviderCTRL.createServiceProviderAccount);

Router.post('/continue_sp_creation', serviceProviderCTRL.createServiceProvider);

//1.3  filter activities as a visitor and moving back and forth each 10 activities
Router.get('/get_filtered_activities', visitorCTRL.filterActivitiesBy);
Router.get('/get_filtered_activities_next', visitorCTRL.filterActivitiesByNext);
Router.get('/get_filtered_activities_prev', visitorCTRL.filterActivitiesByPrev);


//4.8 analytics
Router.get('/get_analysis', adminCTRL.getAnalyticsPage);


//2.5 user add his interests
Router.post('/add_user_interest', userCTRL.addUserInterest);
Router.post('/delete_user_interest', userCTRL.deleteUserInterest);
Router.get('/view_user_interest', userCTRL.viewAllUserInterest);



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

Router.post('/accept_sp_requests', adminCTRL.acceptServiceProviderRequests);
Router.post('/reject_sp_requests', adminCTRL.rejectServiceProviderRequests);

////////////morcus///////////////////


////////////sherrie///////////////////

//LogIn Passport
Router.get('/login', function(req, res){
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

Router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/test',
    failureFlash : true
  },function(req,res){
    if(req.body.type==0)
    res.redirect('user_login');
    else
    res.redirect('serviceProvider_login');
  }));


//2.1.3 log out
Router.get('/logout', function(req, res){
    req.logout();
    req.session.regenerate(function(err){});
    res.redirect('/');
  });





//3.6 confirm checkIns
Router.post('/bookings', serviceProviderCTRL.viewBookings);

////////////youssef///////////////////

//SignUp passport
Router.get('/signup', function(req, res){
		res.render('signup');
	});


	Router.post('/signup', passport.authenticate('local-signup', {
		failureRedirect: '/signup',
		failureFlash: true
	},function(req,res){
    if(req.body.type==0)
    res.redirect('/user_signup');
    else
    res.redirect('/serviceProvider_signup');
  }));

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




//1.6 read about the platform through the “about us” option
//tested
Router.get('/about_uspage',function(req,res){
  res.render("aboutus_page.ejs");
});

// 1.1 A Visitor can explore different activities
Router.get('/explore_activities', visitorCTRL.getDifferentActivities);
Router.get('/explore_activities_next', visitorCTRL.getDifferentActivitiesnext);
Router.get('/explore_activities_prev', visitorCTRL.getDifferentActivitiesprev);

//2.8 user Complain serviveprovider
Router.post('/complain', userCTRL.submitUserComplain);
Router.post('/complain_update', userCTRL.updateComplainBody);
Router.post('/complain_status', userCTRL.viewStatusOfComplain);





////////////kareem///////////////////



return Router;}
