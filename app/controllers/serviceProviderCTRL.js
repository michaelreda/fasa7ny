let Activity = require('../models/activity.js');
let ServiceProvider = require('../models/serviceProvider');
let Account = require('../models/account');
let Offer = require('../models/offer');
var ObjectId = require('mongoose').Types.ObjectId;

let ServiceProviderCTRL = {
  isServiceProvider: function(req,res){
    if(!req.session.serviceProviderID)
      res.send("you are not a Service Provier.. you are not authorized to do this function");
  },

  //tested
  //As a service provider I shall add activities that my firm provides so that I can schedule them for my clients.
  addActivity : function(req,res){
    ServiceProviderCTRL.isServiceProvider(req,res);
    //validating
    req.checkBody('title','title is required').notEmpty();
    req.checkBody('type','type is required').notEmpty();
    req.checkBody('prices','prices are required').notEmpty().isArray();
    req.checkBody('timings','timings is required').notEmpty().isArray();
    req.checkBody('durationInMinutes','durationInMinutes is required of type int').notEmpty().isInt({min:1});
    req.checkBody('minClientNumber','minClientNumber is a required of positive number').notEmpty().isInt({min:-1});
    req.checkBody('maxClientNumber','maxClientNumber is a required of positive number').notEmpty().isInt({min:-1});
    req.sanitize('minClientNumber').toInt();
    req.sanitize('maxClientNumber').toInt();
    req.checkBody('maxClientNumber','maxClientNumber should be greater then or equal minClientNumber').gte(req.body.minClientNumber);
    req.checkBody('minAge','minClientNumber is a positive number').optional().isInt({min:-1});
    req.checkBody('maxAge','maxClientNumber is a positive number').optional().isInt({min:-1});
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    else{
      let newActivity = new Activity(
        {"title" :req.body.title,
        "type":req.body.type,
        "serviceProviderId":req.session.serviceProviderId,
        "timings":req.body.timings,
        "durationInMinutes":req.body.durationInMinutes,
        "minClientNumber":req.body.minClientNumber,
        "maxClientNumber":req.body.maxClientNumber,
        "media":[],
        "prices":[],
        "location":req.body.location,
        "theme": req.body.theme,
        "rating":0,
        "ratingCount":0});
        if(req.files && req.files.length>0){
          for (var i = 0; i < req.files.length; i++) {
            newActivity.media.push({"type":req.body.mediaTypes[i],"url":req.files[i].path});
          }
        }

        if(req.body.prices&&req.body.prices.length>0){
          for (var i = 0; i < req.body.prices.length; i++) {
            newActivity.prices.push(req.body.prices[i]);
          }
        }

        if(req.body.minAge){
          newActivity.minAge=req.body.minAge;
        }
        if(req.body.maxAge){
          newActivity.maxAge=req.body.maxAge;
        }

        newActivity.save(function(err){
          if(err){
            console.log(err);
          }
          else {
            res.send("activity added succesfully");
          }

        });

      }

    },

//1.10 a serviceProvider can apply
        // createServiceProviderAccount:function(req, res){
        //       let account = new Account(req.body);
        //       account.type=1;
        //       account.save(function(err, account){
        //           if(err){
        //               res.send(err.message);
        //           }
        //           else{
        //               req.session.account=account;
        //               res.send(200);
        //           }
        //       });
        //   },

        //missing legal proof media
     createServiceProvider:function(req, res){
       //validating
       req.checkBody('title','title is required').notEmpty();
       req.checkBody('serviceProviderAccountId','serviceProviderAccountId is required').isMongoId();
       req.checkBody('description','description are required').notEmpty();
       req.checkBody('entertainmentType','entertainmentType is required').notEmpty().isArray();
       req.checkBody('branches','branches is a required').notEmpty().isArray();
       req.checkBody('contactMobile','contactMobile is a required').notEmpty().isArray();
       var errors = req.validationErrors();
       if (errors) {
         res.send(errors);
         return;
       }
       //end validating
        let serviceProvider = new ServiceProvider(req.body);
        serviceProvider.serviceProviderAccountId=req.session.account._id;
        if(req.files.length>0){
      serviceProvider.media=[];
      for (var i = 0; i < req.files.length; i++) {
          serviceProvider.media.push({"type":req.body.mediaTypes[i],"url":req.files[i].path});
      }
    }
        serviceProvider.save(function(err, account){
            if(err){
                res.send(err.message);
            }
            else{
                req.session.serviceProviderID=serviceProvider._id;
                res.send(200);
            }
        });
    },
    //tested
    //3.2.1 As a service provider I can update my activities
    updateActivity:function(req,res){
      ServiceProviderCTRL.isServiceProvider(req,res);
      //validating
      req.checkBody('activityID','serviceProviderAccountId is required').isMongoId();
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating

      Activity.findOne({"_id":new ObjectId(req.body.activityID)},function(err,activity){

        if(!activity)
          res.send("activity not found");

        if(req.body.title){
          activity.title=req.body.title;
        }
        if(req.body.type){
          activity.type=req.body.type;
        }

        if(req.body.minClientNumber){
          activity.minClientNumber=req.body.minClientNumber;
        }
        if(req.body.maxClientNumber){
          activity.maxClientNumber=req.body.maxClientNumber;
        }
        if(req.body.theme){
          activity.theme=req.body.theme;
        }
        if(req.body.location){
          activity.location=req.body.location;
        }
         if(req.files && req.files.length>0){
          activity.media=[];//assuming that the whole array will be sent again
          for (var i = 0; i < req.files.length; i++) {
            activity.media.push({"type":req.body.mediaTypes[i],"url":req.files[i].path});
          }
        }

        if(req.body.prices&&req.body.prices.length>0){
          activity.prices=[];
          for (var i = 0; i < req.body.prices.length; i++) {
            activity.prices.push(req.body.prices[i]);
          }
        }

        if(req.body.minAge){
          activity.minAge=req.body.minAge;
        }
        if(req.body.maxAge){
          activity.maxAge=req.body.maxAge;
        }

        activity.save(function(err){
          if(err){console.log(err);
          }
          else {
            res.send("activity updated succesfully");
          }

        });
      });
    },
    //tested
    //3.2.2 As a service provider I can delete my activities
    deleteActivity: function(req,res){
      ServiceProviderCTRL.isServiceProvider(req,res);
      //validating
      req.checkBody('activityID','activityID is required').isMongoId();
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating
      Activity.findOne({"_id":new ObjectId(req.body.activityID)}).remove().exec(function(err){
        if(err){
          res.send(err);
        }
        else {
          res.send("activity deleted succesfully");
        }
      })

    },

    //tested
    //3.2.3 As a service provider I can reschedule my activities
    rescheduleActivity:function(req,res){
      ServiceProviderCTRL.isServiceProvider(req,res);
      //validating
      req.checkBody('activityID','activityID is required').isMongoId();
      req.checkBody('timings','timings is required').notEmpty().isArray();
      req.checkBody('durationInMinutes','durationInMinutes is required of type int').notEmpty().isInt({min:1});
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating
      Activity.findOne({"_id":req.body.activityID},function(err, activity){

        if(req.body.durationInMinutes){
          activity.durationInMinutes=req.body.durationInMinutes;
        }

        if(req.body.timings&&req.body.timings.length>0){
          activity.timings=req.body.timings;
        }


        activity.save(function(err){
          if(err){console.log(err);
          }
          else {
            res.send("rescheduled activity succesfully");
          }
        });
      });
    },

    //tested .. missing hashing
    createServiceProviderAccount:function(req, res){
      //validating
      req.checkBody('userName','username is required').notEmpty();
      req.checkBody('userName','username minimum length is 6').isLength({min:6});
      req.checkBody('password','password is required').notEmpty();
      req.checkBody('password','password minimum length is 6').isLength({min:6});
      req.checkBody('email','email is required').isEmail();
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating
      let account = new Account(req.body);
      account.type=1;
      account.save(function(err, account){
        if(err){
          if(err.message.includes("duplicate")&& err.message.includes("userName"))
            res.send("userName already exists");
          if(err.message.includes("duplicate")&& err.message.includes("email"))
            res.send("email already exists");
          res.send(err.message);
        }
        else{
          req.session.account=account;
          res.send("sp account created succesfully");
        }
      });
    },

    //3.1 Login as a service Provider
    //tested .. NOT WORKING
    serviceProviderLogin: function(req,res){
      //validating
      req.checkBody('userName','username is required').notEmpty();
      req.checkBody('password','password is required').notEmpty();
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating

      //var isValidPassword = function(user, password){
      //return bCrypt.compareSync(password, user.password);
      //}
      var passport = require('passport');
      var LocalStrategy = require('passport-local').Strategy;
      passport.use('login', new LocalStrategy({
        passReqToCallback : true
      },
      function(req, userName, password, done) {

        Account.findOne({ 'userName' :  userName },
        function(err, user) {

          if (err)
          return done(err);  // In case of any error, return using the done method

          if (!user){
            console.log('User Not Found with userName '+userName); // userName does not exist, log error & redirect back
            return done(null, false,
              req.flash('message', 'User Not found.'));
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




      //karim and andrea's code
      //tested .. session variable to be edited
      viewAddOffer: function(req,res){
        ServiceProviderCTRL.isServiceProvider(req,res);
        ServiceProvider.findOne({_id:req.session.loggedInUser._id})
        .populate({path: 'activities'})
        .exec(function(err,provider){
            res.send(provider);
        })

      //  res.render('viewAddOffer',provider.activities);
      },
      //tested
      addOffer:function(req,res){
        ServiceProviderCTRL.isServiceProvider(req,res);
        //validating
        req.checkBody('title','title is required').notEmpty();
        req.checkBody('description','description are required').notEmpty();
        req.checkBody('discount','discount is required of type int>=0').isDecimal({min:0});
        req.checkBody('deadline','deadline is required valid date in the following format: 2017-04-20T00:00:00.000Z').isISO8601(); //check if the string is a valid ISO 8601 date.
        req.checkBody('deadline','deadline should be in the future').isAfter();
        req.checkBody('isActive','isActive is a required of type Boolean').optional().isBoolean();
        req.sanitize('isActive').toBoolean();
        req.checkBody('activities','activities is a required').notEmpty().isArray();
        var errors = req.validationErrors();
        if (errors) {
          res.send(errors);
          return;
        }
        //end validating
        let offer = new Offer(req.body);
        offer.save(function(err,offer){
          if(err){
            console.log(err);
            res.send(err.message);
          }else{
            //ServiceProvider.update({_id: req.session.serviceProvider._id},{$push: {}})
            res.send('offer added');//same redirection as update
          }
        })
      },
      //tested
      deleteOffer:function(req,res){
        ServiceProviderCTRL.isServiceProvider(req,res);
        //validating
        req.checkBody('offerId','title is required').isMongoId();
        var errors = req.validationErrors();
        if (errors) {
          res.send(errors);
          return;
        }
        //end validating
        Offer.findOne({_id:req.body.offerId},function(err,offer){
          if(err){
            console.log('err');
          }else{
            Offer.remove(offer).exec(function(err){
              if(err)
              res.send(err.message);
              else
              res.send('offer deleted');//same redirection as update
            })
          }
        })
      },
      //tested
      updateOffer: function (req, res) {
        ServiceProviderCTRL.isServiceProvider(req,res);
        //validating
        req.checkBody('offerId','offerId is required').isMongoId();
        req.checkBody('title','title is required').optional().notEmpty();
        req.checkBody('description','description are required').optional().notEmpty();
        req.checkBody('discount','discount is required of type int>=0').optional().isDecimal({min:0});
        req.checkBody('deadline','deadline is required valid date in the following format: 2017-04-20T00:00:00.000Z').optional().isISO8601(); //check if the string is a valid ISO 8601 date.
        req.checkBody('deadline','deadline should be in the future').optional().isAfter();
        req.checkBody('isActive','isActive is a required of type Boolean').optional().isBoolean();
        req.sanitize('isActive').toBoolean();
        req.checkBody('activities','activities is a required').optional().notEmpty().isArray();
        var errors = req.validationErrors();
        if (errors) {
          res.send(errors);
          return;
        }
        //end validating
        Offer.update({ _id: new ObjectId(req.body.offerId) },{$set:req.body})
        .exec(function (err,status) {
          if (err)
          res.send(err.message);
          else
          if(status.nModified!=0)
            res.send('should redirect to service provider logged in page');
          else
            res.send("offer not found");
        })
    },

//session var to be edited
      viewHoldingReservations:function(req, res){
        ServiceProviderCTRL.isServiceProvider(req,res);
        Booking.find({serviceProviderID: req.session.serviceProvider._id, isHolding: true},	function(err, bookings){
          //when a booking is canceled, isHolding is set to false
          if(err){
            res.send(err.message);
          }else
          {
            res.send( bookings);
          }
        })

      },
      //tested
      //missing payment
      //session var to be edited
      applyToGolden:function(req,res){
        ServiceProviderCTRL.isServiceProvider(req,res);
        ServiceProvider.update({_id:req.session.serviceProvider._id},{$set: {'isGolden': true}}).exec(function(err,status){
          if(err)
              res.send(err.message);
          else
            if(status.nModified!=0)
              res.send('should redirect to serviceProvider home page');
            else
              res.send('sp not found');

        });
      },
      viewBookings:function(req,res){
        ServiceProviderCTRL.isServiceProvider(req,res);
        Booking.find({"serviceProviderId":req.session.serviceProviderId,"isConfirmed":false},function(err,bookings){
          if(err){
            res.send(err);
          }
          else{
            res.send(bookings);
          }
        })
      },

      confirmCheckIn:function(req,res){
        ServiceProviderCTRL.isServiceProvider(req,res);
        //validating
        req.checkBody('bookingid','bookingid is required').isMongoId();
        req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
        var errors = req.validationErrors();
        if (errors) {
          res.send(errors);
          return;
        }
        //end validating
        //req. is a booking
        Booking.update({_id:req.body.bookingid},{$set:{isConfirmed:true}}).exec(function(err,status){
          if(err){
            res.send(err);
          }
          else{
            if(status.nModified==0)
              res.send('booking is not found');
            else{
            ServiceProvider.findOne({"_id":req.body.serviceProviderId}, function(err, sp){
              if(err){
                res.send(err);
              }
              else{
                    sp.previousClients.push(req.body.userId);
                    sp.save(function(err){
                      if(err)
                      res.send(err);
                      else{
                        res.send(200);
                      }
                    });
              }
            })
          }
            res.send("Booking is confirmed");
          }
        })
      },
      submitServiceProviderComplain:function(req,res){
        ServiceProviderCTRL.isServiceProvider(req,res);
        //validating
        req.checkBody('providerId','providerId is required').isMongoId();
        req.checkBody('complain','complain is required').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
          res.send(errors);
          return;
        }
        //end validating

        let complain = new Complain(req.body);
        complain.providerId= req.session.serviceProviderId._id;
        complain.isUserToProvider= false;
        complain.save(function(err,complain){
          if(err)
          {
            res.send(err.message);
          }else {
            res.send(200)
          }
        })
      }

    }

    module.exports = ServiceProviderCTRL;
