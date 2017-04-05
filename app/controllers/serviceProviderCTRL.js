let Activity = require('../models/activity.js');
let ServiceProvider = require('../models/serviceProvider.js');
let Account = require('../models/account.js');
let Offer = require('../models/offer.js');
let Booking=require('../models/booking.js');
let User=require('../models/user.js');
var ObjectId = require('mongoose').Types.ObjectId;


let ServiceProviderCTRL = {
  //tested
  //As a service provider I shall add activities that my firm provides so that I can schedule them for my clients.
  addActivity : function(req,res){

    if(!req.body.title|!req.body.type|!req.body.prices|!req.body.durationInMinutes|!req.body.timings|!req.body.minClientNumber|!req.body.maxClientNumber){
      res.send("missing fields");
    }
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
     createServiceProvider:function(req, res){
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
      //res.send(req.body.activityID);

      Activity.findOne({"_id":new ObjectId(req.body.activityID)},function(err,activity){

        // res.send("activity "+activity);
        // return;
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

    //required for testing
    viewAllActivities: function(req,res){
      Activity.find(function(err,act){
        if(err){
          res.send(err);
        }
        else{
          res.send(act);
        }
      })
    },

    //tested .. missing hashing
    createServiceProviderAccount:function(req, res){
      let account = new Account(req.body);
      account.type=1;
      account.save(function(err, account){
        if(err){
          res.send(err.message);
        }
        else{
          req.session.account=account;
          res.send("sp account created succesfully");
        }
      });
    },


      //karim and andrea's code
      //tested .. session variable to be edited
      viewAddOffer: function(req,res){
        ServiceProvider.findOne({_id:req.session.loggedInUser._id})
        .populate({path: 'activities'})
        .exec(function(err,provider){
            res.send(provider);
        })

      //  res.render('viewAddOffer',provider.activities);
      },
      //tested
      addOffer:function(req,res){
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
        Offer.update({ _id: new ObjectId(req.body.offerId) },{$set:req.body})
        .exec(function (err) {
          if (err)
          res.send(err.message);
          else
          res.send('should redirect to service provider logged in page');
        })
      },

      viewHoldingReservations:function(req, res){

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
      applyToGolden:function(req,res){
        ServiceProvider.update({_id:req.session.serviceProvider._id},{$set: {'isGolden': true}}).exec(function(){
          res.send('should redirect to serviceProvider home page');
        });
      },

      //3.6 confirm checkins
      viewBookings:function(req,res){
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
        //req. is a booking
        Booking.update({_id:req.body.bookingid},{$set:{isConfirmed:true}}).exec(function(err){
          if(err){
            res.send(err);
          }
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
            res.send("Booking is confirmed");
          }
        })
      },

      //required for testing
      viewAllUsers:function(req,res){
        User.find(function(err, users){
          if(err){
            res.send(err);
          }
          else{
            res.send(users);
          }
        })
      }

    }

    module.exports = ServiceProviderCTRL;
