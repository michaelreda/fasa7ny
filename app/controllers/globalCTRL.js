let User = require('../models/user');
let ServiceProvider = require('../models/serviceProvider');
let Offer           = require('../models/offer');
let Account = require('../models/account.js');
let Booking = require('../models/booking.js');
let Log= require('../models/log.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');



let globalCTRL ={
  banDecrement:function(){
    User.update({
      "banned": {'$ne':0}
    }, {
      $inc: { "banned": -1 }
    }, {
      multi: true
    });
    ServiceProvider.update({
      "banned": {'$ne':0}
    }, {
      $inc: { "banned": -1 }
    }, {
      multi: true
    });
  },

  sendNewsletter: function(){

    Account.find({"type":2},'email',function(err, visitorMails){
      if(err)
      console.log(err);
      else {

        Offer.find().sort({'_id':-1}).limit(5).populate({path: 'activities'}).exec(function(err, hottestOffers){
          if(err)
          console.log(err);
          else {
            var transporter = nodemailer.createTransport(smtpTransport({
              service: 'Hotmail',
              auth: {
                user: 'fasa7ny@outlook.com', // Your email id
                pass: 'ITJumoynyoj1' // Your password
              }
            }));

            var mailOptions = {
              from: 'fasa7ny@outlook.com', // sender address
              to: visitorMails, // list of receivers
              subject: 'Your Password', // Subject line
              //text: text //, // plaintext body
              html: hottestOffers// You can choose to send an HTML body instead
            };
            transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error);
                res.send(error);
              }else{
                console.log('Message sent: ' + info.response);
                res.redirect(200);
              };
            });

          }
        });
      }

    })

  },
  overdueBookings:function(){
    Booking.update({
      "time": {'$lte':new Date()},
      "isCancelled" :false,
      "isConfirmed" :false
    }, {
      $set: { "isCancelled": true }
    }, {
      multi: true
    });
  },

  addErrorLog: function(errMsg){
    let log = new Log();
    log.errorMessage= "Errors: "+errMsg.message;
    log.type= "Name: "+errMsg.name;
    log.save(function (err) {
      if(err)
      console.log(err);
      else
      console.log("log inserted xD");
    });
  },
  checkUserSession:function(req,res){
    if(req.session.user)
    res.send(true);
    else {
      res.send(false);
    }
  },
  checkSPSession:function(req,res){
    if(req.session.serviceProvider)
    res.send(true);
    else {
      res.send(false);
    }
  }
  ,
  checkAdminSession:function(req,res){
    if(req.session.admin)
    res.send(true);
    else {
      res.send(false);
    }
  }

}

module.exports = globalCTRL;
