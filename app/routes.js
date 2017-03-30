
//add dependencies
var express= require('express');
var Router = express.Router();
var mongoose = require('mongoose');
var visitorCTRL= require('./controllers/visitorCTRL');

// router configuration
Router.post('/',visitorCTRL.shareActivityOnFacebook);


//exporting to be used in server.js
module.exports = Router;
