let Log = require('../models/log.js');
let Complain = require('../models/complain');
let User = require('../models/user');
let ServiceProvider = require('../models/serviceProvider');
let Account         = require('../models/account');
let Message         = require('../models/message');
let Booking         = require('../models/booking');
let Activity         = require('../models/activity');


var ObjectId = require('mongoose').Types.ObjectId;

let adminCTRL={
  //used to test if the user is admin or not
  isAdmin: function(req,res){
    if(!req.session.admin)
      res.send("you are not an admin.. you are not authorized to do this function");
  },


//tested without exception
banForever:function(req,res){
  adminCTRL.isAdmin(req,res);
  //validating
  req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
  req.checkBody('isUserToProvider','isUserToProvider is required of type boolean').notEmpty().isBoolean();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
req.sanitize('isUserToProvider').toBoolean(); //converting to boolean in case it's a string
if (req.body.isUserToProvider) {
ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:-1}}).exec(function(err,status){
  if(err)
      res.send(err.message);
  else
    if(status.nModified!=0)
      res.send('ban successful');
    else
      res.send('sp not found');

})
} else {
  User.update({_id:req.body.userId},{$set:{banned:-1}}).exec(function(err,status){
    if(err)
        res.send(err.message);
    else
      if(status.nModified!=0)
        res.send('ban successful');
      else
        res.send('user not found');

  })

}
},
//tested without exception
ban30Days:function(req,res){
  adminCTRL.isAdmin(req,res);
  //validating
  req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
  req.checkBody('isUserToProvider','isUserToProvider is required of type boolean').notEmpty().isBoolean();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  req.sanitize('isUserToProvider').toBoolean(); //converting to boolean in case it's a string
  if (req.body.isUserToProvider) {
    ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:30}}).exec(function(err,status){
      if(err)
        res.send(err.message);
      else
        if(status.nModified!=0)
          res.send('ban successful');
        else
          res.send('sp not found');

    })
  } else {
    User.update({_id:req.body.userId},{$set:{banned:30}}).exec(function(err,status){
      if(err)
        res.send(err.message);
      else
        if(status.nModified!=0)
          res.send('ban successful');
        else
          res.send('user not found');

    })

  }
},
//tested without exception
updateBanStatus:function(req,res){
  adminCTRL.isAdmin(req,res);
  //validating
  req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
  req.checkBody('banDuration','banDuration is required of type int').notEmpty().isInt();
  req.checkBody('isBanUser','isBanUser is required of type Boolean').notEmpty().isBoolean();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  req.sanitize('isBanUser').toBoolean(); //converting to boolean in case it's a string
if (req.body.isBanUser == false) {
ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:req.body.banDuration}}).exec(function(err,status){
  if(err)
      res.send(err.message);
  else
    if(status.nModified!=0)
      res.send('sp ban status updated successful');
    else
      res.send('sp not found');

})
} else {
  User.update({_id:req.body.userId},{$set:{banned:req.body.banDuration}}).exec(function(err,status){
    if(err)
        res.send(err.message);
    else
        if(status.nModified!=0)
          res.send('user ban status updated successful');
        else
          res.send('user not found');

  })

}
},
//tested
viewComplains:function(req,res){
  adminCTRL.isAdmin(req,res);
  Complain.find(function(err, complains){
    if(err)
    res.send(err.message);
    else
    res.send(complains);
  })
},
//tested without exception
removeComplain:function(req,res){
  adminCTRL.isAdmin(req,res);
  //validating
  req.checkBody('complainId','complainId is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
Complain.findOne({_id:req.body.complainId},function(err,val){
  if(err){
    console.log(err.message);
 }
  else{
    if(val.isSeen){
  Complain.remove(val).exec(function(err){
    if(err)
        res.send(err.message);
    else
        res.send('complain deleted');
      })
    }
}
})
},
//tested without exception
viewServiceProviderRequests:function(req,res){
  adminCTRL.isAdmin(req,res);
  ServiceProvider.find({Approved:0},function(err,serviceProviders){
    if(err)
          res.send(err.message);
      else
          res.send(serviceProviders);
  })
},
//tested without exception
//link sent to be edited when views are ready
acceptServiceProviderRequests:function(req,res){
  adminCTRL.isAdmin(req,res);
  //validating
  req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{Approved:1}}).exec(function(err){
    if(err)
          res.send(err.message);
      else{


          var nodemailer = require('nodemailer');
          var smtpTransport = require('nodemailer-smtp-transport');
          ServiceProvider.findOne({_id:req.body.serviceProviderId}).populate('serviceProviderAccountId').exec(function(err,serviceProvider){
            var transporter = nodemailer.createTransport(smtpTransport({
              service: 'Hotmail',
              auth: {
                user: 'fasa7ny@outlook.com', // Your email id
                pass: 'ITJumoynyoj1' // Your password
              }
            }));

            var mailOptions = {
              from: 'fasa7ny@outlook.com', // sender address
              to: serviceProvider.serviceProviderAccountId.email, // sp email
              subject: 'Congratulations..your account is APPROVED!!', // Subject line
              //text: "fasa7ny platform is happy to welcome you, next step is to add activities .." //, // plaintext body
              html: '<p>fasa7ny platform is happy to welcome you, next step is to add activities ..</p> <a href="http://localhost:8080/add_activity">click here to add activity </a>'// You can choose to send an HTML body instead
            };
            transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error);
                res.send(error);
              }else{
                console.log('Message sent: ' + info.response);
                res.send('approved successfully');
              };
            });
          });

        }
  })
},
//tested without exception
//link sent to be edited when views are ready
rejectServiceProviderRequests:function(req,res){
  adminCTRL.isAdmin(req,res);
  //validating
  req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{Approved:-1}}).exec(function(err){
    if(err)
          res.send(err.message);
      else{


          var nodemailer = require('nodemailer');
          var smtpTransport = require('nodemailer-smtp-transport');
          ServiceProvider.findOne({_id:req.body.serviceProviderId}).populate('serviceProviderAccountId').exec(function(err,serviceProvider){
            var transporter = nodemailer.createTransport(smtpTransport({
              service: 'Hotmail',
              auth: {
                user: 'fasa7ny@outlook.com', // Your email id
                pass: 'ITJumoynyoj1' // Your password
              }
            }));

            var mailOptions = {
              from: 'fasa7ny@outlook.com', // sender address
              to: serviceProvider.serviceProviderAccountId.email, // sp email
              subject: 'account rejected', // Subject line
              //text: "fasa7ny platform is happy to welcome you, next step is to add activities .." //, // plaintext body
              html: '<p>We are sorry that your account was rejected .. still thinking that you are qualified to join fasa7ny ? </p> <a href="#">Contact us</a>'// You can choose to send an HTML body instead
            };
            transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error);
                res.send(error);
              }else{
                console.log('Message sent: ' + info.response);
                res.send('rejected successfully');
              };
            });
          });

        }
  })
},


adminLogin: function(req,res){
//var isValidPassword = function(user, password){
  //return bCrypt.compareSync(password, user.password);
//}

//validating
req.checkBody('userName','Username is required').notEmpty();
req.checkBody('password','Password is required').notEmpty();
var errors = req.validationErrors();
if (errors) {
  res.send(errors);
  return;
}
//end validating
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, userName, password, done) {

    account.findOne({ 'userName' :  userName },
      function(err, user) {

        if (err)
          return done(err);  // In case of any error, return using the done method

        if (!user){
          console.log('User Not Found with userName '+userName); // userName does not exist, log error & redirect back
          return done(null, false,
                req.flash('message', 'user Not found.'));
        }

        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false,
              req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from
        // done method which will be treated like success
        req.session.loggedInUser=user;
        return done(null, user);
      }
    );
}));
},

//tested without exception

viewAllChats:function(req, res){
adminCTRL.isAdmin(req,res);
Message.find(function(err, messages){
	if(err){
	     res.send(err.message);
    }else{
			res.send(messages);
		}
})

},
//4.5 admin views system logs
viewSystemLogs: function(req,res){
  adminCTRL.isAdmin(req,res);
  Log.find(function(err, log){
        if(err)
            res.send(err.message); //display messages
        else
            res.render('viewSystemLogs',{"logs":log});
    })
},


updateLogs: function(req,res){
// will not be done, delete from SRS
},

//4.5 admin deletes system logs
deleteLogs: function(req,res){
  adminCTRL.isAdmin(req,res);
  Log.remove(function(err, log){
    if(err)
      res.send(err.message);
    else {
       res.render('logPage');
    }
  })
},

//tested without exception
viewChatMessages:function(req, res){
  adminCTRL.isAdmin(req,res);
  //validating
  req.checkBody('messageId','messageId is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
Message.findOne({_id: req.body.messageId }, function(err, chat){

	if(err){
	     console.log(err.message);
    }else{
      if(chat)
			   chat.isSeen=true;
			res.send(chat);
		}
})

},


//4.8 analytics
getAnalyticsPage:function(req,res){
      adminCTRL.isAdmin(req,res);
      // finding top activity
      booking.aggregate(
    {$group : {_id : "$activityId", "count" : {$sum : 1}}},
    {$sort : {"count" : -1}},
    {$limit : 1},function(err,topBooking){
      if(err)
      {
        res.sed(err.message)
      }else
      {
                Activity.findOne({_id:topBooking.activityId},function(err,topActivity){
                  if(err)
                  {
                    res.send(err.message)
                  }
                  else
                  {
                          ServiceProvider.findOne({_id:topBooking.serviceProviderId},function(err,topSP){
                      if(err)
                      {
                        res.send(err.message)
                      }
                      else
                      {
                            User.aggregate(
                            {$group : {_id : "$numberOfLogins", "count" : {$sum : 1}}},
                            {$sort : {"count" : -1}},
                            {$limit : 1},function(err,topUser){
                                if(err)
                                {
                                  res.send(err.message)
                                }else{
                                    res.send({topActivity,topSP,topUser});
                                }

                            })


                      }
                       })
                  }
                })
      }
    }
)
    }

}

module.exports = adminCTRL;
