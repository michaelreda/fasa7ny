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


  viewComplains:function(req,res){
    Complain.find(function(err, complain){

        if(err)
            res.send(err.message);
        else
            res.render('viewComplains',{complain});
    })
},

banForever:function(req,res){
if (req.body.isUserToProvider) {
ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:-1}}).exec(function(err){
  if(err)
      res.send(err.message);
  else
      res.render('ban successful'.send);

})
} else {
  User.update({_id:req.body.userId},{$set:{banned:-1}}).exec(function(err){
    if(err)
        res.send(err.message);
    else
        res.render('ban successful'.send);

  })

}
},
ban30Days:function(req,res){
if (req.body.isUserToProvider) {
ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:30}}).exec(function(err){
  if(err)
      res.send(err.message);
  else
      res.render('ban successful'.send);

})
} else {
  User.update({_id:req.body.userId},{$set:{banned:30}}).exec(function(err){
    if(err)
        res.send(err.message);
    else
        res.render('ban successful'.send);

  })

}
},
removeComplain:function(req,res){
Complain.findOne({_id:req.params.complainId},function(err,val){
  if(err){
 }
  else{
    if(val.isSeen){
  Complain.remove(val).exec(function(err){
    if(err)
        res.send(err.message);
    else
        res.render('complain deleted'.send);
      })
    }
}
})
},
viewServiceProviderRequests:function(req,res){
  ServiceProvider.find({isApproved:0},function(err,val){
    if(err)
          res.send(err.message);
      else
          res.render('viewServiceProviderRequests',{serviceProvider});
  })
},
//tested
//link sent to be edited when views are ready
acceptServiceProviderRequests:function(req,res){
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
//tested
//link sent to be edited when views are ready
rejectServiceProviderRequests:function(req,res){
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
viewAllChats:function(req, res){

Message.find(function(err, messages){

	if(err){
	     res.send(err.message);
    }else
        {
			res.send(messages);
		}
})

},
//4.5 admin views system logs
viewSystemLogs: function(req,res){
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
  Log.remove(function(err, log){
    if(err)
      res.send(err.message);
    else {
       res.render('logPage');
    }
  })
},

viewChatMessages:function(req, res){

Message.findOne({_id: req.body.messageId }, function(err, message){

	if(err){
	     res.send(err.message);
    }else
        {
			message.isSeen=true;
			res.send(message);
		}
})

},

updateBanStatus:function(req,res){
if (!req.body.isBanUser) {
ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:req.body.banDuration}}).exec(function(err){
  if(err)
      res.send(err.message);
  else
      res.send('ban successful');

})
} else {
  User.update({_id:req.body.userId},{$set:{banned:req.body.banDuration}}).exec(function(err){
    if(err)
        res.send(err.message);
    else
        res.send('ban successful');

  })

}
},
    //4.8 analytics
    //testing - waiting for bookings to be able to analyze them
    getAnalyticsPage:function(req,res){
      // finding top activity
      Booking.aggregate(
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
    },

    viewBookings:function(req,res){

      Booking.find(function(err,bookings){
        if(err)
        {
          res.send(err.message);
        }else
        {
          res.send({bookings});
        }
      })
    }

}

module.exports = adminCTRL;
