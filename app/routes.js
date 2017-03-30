
//add dependencies
var express= require('express');
var Router = express.Router();
var mongoose = require('mongoose');
var visitorCTRL= require('./controllers/visitorCTRL');
var userCTRL= require('./controllers/userCTRL');

// router configuration
Router.post('/',visitorCTRL.shareActivityOnFacebook);

Router.get('/user_Login',userCTRL.login );


//exporting to be used in server.js
module.exports = Router;
