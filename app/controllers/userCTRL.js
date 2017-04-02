let Account = require('../models/account.js');
let User = require('../models/user.js');
let ServiceProvider = require('../models/serviceProvider.js');
let Activity = require('../models/activity');
let Message=require('../models/message.js');
let Booking=require('../models/booking.js');

let userCTRL = {


//2.6 comparing activities or service providers
getActivitiesToCompare:function(req, res){

        Activity.findOne({_id: req.body.activity1ID},function(err,activity1){

            if(err)
                res.send(err.message);
            else{

                Activity.findOne({_id: req.body.activity2ID},function(err,activity2){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activity1,activity2});
                    }
                })


            }
        })
    },
    //2.6 comparing activities or service providers
    getServiceProviderToCompare:function(req, res){

        ServiceProvider.findOne({_id: req.body.SP1ID},function(err,SP1){

            if(err)
                res.send(err.message);
            else{

                ServiceProvider.findOne({_id: req.body.SP2ID},function(err,SP2){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({SP1,SP2});
                    }
                })


            }
        })
    },
    //2.6 comparing activities or service providers
    getFirstListOfChoices:function(req, res){

        ServiceProvider.find(function(err,SPs){

            if(err)
                res.send(err.message);
            else{

                Activity.find(function(err,ACs){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({SPs,ACs});
                    }
                })


            }
        })
    },
    //2.6 comparing activities or service providers
    getSecondListOfChoices:function(req, res){
      if(isServiceProvider)
      {
          ServiceProvider.find(function(err,SPs)
          {

            if(err)
            {
                res.send(err.message);
            }
            else
            {
                res.send({SPs});
            }
          })
      }
      else
      {
          Activity.find(function(err,ACs)
          {

            if(err)
            {
                res.send(err.message);
            }
            else
            {
                res.send({ACs});
            }
          })

      }
    },


//2.1.1 user changes password
changePassword: function(req,res){
  var thisUser=req.session.loggedInUser.userAccountId;
  Account.findOne({'_id':thisUser},
      function(err, userInstance){
        if(err|!userInstance){
          return (err);
        }
        else{
          if(userInstance.validPassword(req.body.oldPassword))
          userInstance.password=req.body.newPassword;
          userInstance.save(function(err){
            if(err)
            res.send(err);
          });
        }
      }
)
},

//From Tweety recover password


//2.4 user subscribes to a service provider

//2.11 As a logged in user I can change my privacy to control who sees my information
changePrivacy: function(req,res){
  if(req.body.privacy<0 || req.body.privacy>2)
    res.send("privacy should be 0,1 or 2");
  User.update({_id:req.session.user._id},{$set:{privacy:req.body.privacy}}).exec(function(err){
    if(err){
      res.send(err)
    }else{
      res.send("privacy changed succesfully");
    }
  })
},


//2.4 user subscribes to a service provider

subscribe: function(req,res){
  var serviceProviderID=req.session.serviceProvider._id;
  var loggedInUser= req.session.loggedInUser._id;


  ServiceProvider.findOne({ '_id' : serviceProviderID},
    function(err, providerInstance){
      if (err){
        return (err);
      }
      else{
        providerInstance.subscribedUsers.push(loggedInUser);
        providerInstance.save(function(err){
          if(err){
            return (err);
          }
          else {
            req.flash('message', 'You are now subscribed to this provider');
          }
        })
      }
    }
)
},

//2.13 user contacts platform
contactPlatform: function (req,res){
  var logInUser=req.session.loggedInUser._id;
  message.findOne({fromId:logInUser}).exec(function(err, msg){
    if(err){
      res.send(err);
    }
    else{
      if(!msg){
        let msg=new message();
        message.fromId=logInUser;
        message.message.push({"isUser":true, "message":req.body.message, "time":new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')});
        message.isSeen=false;
      }
      else{
        msg.message.push({"isUser":true, "message":req.body.message, "time":new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')});
        msg.isSeen=false;

      }

msg.save(function(err){
  if(err)
  console.log(err);
  else {
    res.send(200);
  }
})



    }
  })

},


//2.2 As a logged in user I can view
viewMyProfile: function(req,res){
  User.findOne({_id:req.session._id}).exec(function(err,user){
    if(err){
      res.send(err);
    }
    else {
      res.send(user);
    }
  })
},
//2.2 As a logged in user I can update my personal info
//password to be done later
updateMyProfile: function(req,res){

    User.update({_id:req.session.user._id}).exec(function(err){
      if(err){
        res.send(err);
      }
      else {
        res.send("profile updated successfully");
      }
    })

},
//2.2.1 As a logged in user I can delete my account
deleteMyProfile: function(req,res){

    User.findOne({_id:req.session.user._id}).remove().exec(function(err){
      if(err){
        res.send(err);
      }
      else {
        res.send("profile deleted successfully");
      }
    })

}
,
userAddToWishList:function(req,res){
User.update({_id: req.session.user._id}, {$push: {'wishlist' : req.body.activity}}).exec(function(){
    res.send('should redirect to userLoggedinHomepage')
});

},

userDropFromWishList:function(req, res){
User.update({_id: req.session.user._id}, {$pull: {'wishlist' : req.body.activity}}).exec(function(){
    res.send('should redirect to userLoggedinHomepage')
});
},
  //2.3 As a logged in user I can rate/review activities after check-in
  //thus in the view we should handle to hide rating ability unless u checked in
  rateReviewActivity: function(req,res){
    //var ratingCount= parseFloat(req.body.ratingCount)+1;
    //  var newRating= ((ratingCount-1)*parseFloat(req.body.rating)+parseFloat(req.body.inputRating))/ratingCount;
    var rating= parseFloat(req.body.rating);
    var ratingCount = parseFloat(req.body.ratingCount);
    var inputRating = parseFloat(req.body.inputRating);

    var newRating = (rating*ratingCount + inputRating)/(ratingCount+1);

    Activity.update({_id:req.body._id},{$set:{'rating':newRating,'ratingCount':ratingCount}}).exec(function(err){
      if(err)
      res.send(err.message);
      else {
        if(req.body.review){
          var review= new Review(req.body);
          review.rate = inputRating;
          review.save(function(err,project){
            if(err)
            res.send(err.message);
            else {
              res.send("review submitted successfully");
            }
          })
        }
      }
    })

  },
  //2.3.1 As a logged in user I can change my review
  updateReview: function(req,res){

    Review.update({_id:req.body.activityId},{$set:{review:req.body.review}}).exec(function(err){
      if(err){
        res.send(err);
      }
      else {
        res.send("review updated successfully");
      }
    })

  },

  //2.3.2 As a logged in user I can delete my review
  updateReview: function(req,res){

    Review.findOne({_id:req.body.activityId}).remove().exec(function(err){
      if(err){
        res.send(err);
      }
      else {
        res.send("review deleted successfully");
      }
    })},

    //2.3.3 As a logged in user I can check/view my review
    viewMyReviews: function(req,res){

      Review.find({userId:req.session._id}).populate('activityId').exec(function(err,reviews){
        if(err){
          res.send(err);
        }
        else {
          res.send(reviews);
        }
      })


  },
  //2.3 As a logged in user I can rate/review activities after check-in
  //thus in the view we should handle to hide rating ability unless u checked in
  rateReviewActivity: function(req,res){
    //var ratingCount= parseFloat(req.body.ratingCount)+1;
    //  var newRating= ((ratingCount-1)*parseFloat(req.body.rating)+parseFloat(req.body.inputRating))/ratingCount;
    var rating= parseFloat(req.body.rating);
    var ratingCount = parseFloat(req.body.ratingCount);
    var inputRating = parseFloat(req.body.inputRating);

    var newRating = (rating*ratingCount + inputRating)/(ratingCount+1);

    Activity.update({_id:req.body._id},{$set:{'rating':newRating,'ratingCount':ratingCount}}).exec(function(err){
      if(err)
      res.send(err.message);
      else {
        if(req.body.review){
          var review= new Review(req.body);
          review.rate = inputRating;
          review.save(function(err,project){
            if(err)
            res.send(err.message);
            else {
              res.send("review submitted successfully");
            }
          })
        }
      }
    })

  },
  //2.3.1 As a logged in user I can change my review
  updateReview: function(req,res){

    Review.update({_id:req.body.activityId},{$set:{review:req.body.review}}).exec(function(err){
      if(err){
        res.send(err);
      }
      else {
        res.send("review updated successfully");
      }
    })

  },

  //2.3.2 As a logged in user I can delete my review
  updateReview: function(req,res){

    Review.findOne({_id:req.body.activityId}).remove().exec(function(err){
      if(err){
        res.send(err);
      }
      else {
        res.send("review deleted successfully");
      }
    })},

    //2.3.3 As a logged in user I can check/view my review
    viewMyReviews: function(req,res){

      Review.find({userId:req.session._id}).populate('activityId').exec(function(err,reviews){
        if(err){
          res.send(err);
        }
        else {
          res.send(reviews);
        }
      })
},
  viewHistoryBookings: function(req,res){
  Booking.find({userId:req.session.user._id}).exec(function(err,bookings){
    if(err){
      res.send(err);
    }
    else {
      res.render("viewHistoryBookings",bookings);
    }
  })
},
 //2.7 reserve a booking for an activity
bookActivity:function(req,res){
  //req. is of type activity
  let newBooking=new booking();
  newBooking.userId=req.session.loggedInUser._id;
  newBooking.serviceProviderId=req.body.serviceProviderId;
  newBooking.activityId=req.body._id;
  newBooking.isHolding=true;
  newBooking.price=req.body.price; //chosen act is with price in the req
  newBooking.time=req.body.time; //chosen activity is with time from the req.

  res.render("paymentPage", newBooking);
  // where payment method will be called

  Booking.save(function(err){
    if(err)
    console.log(err);
    else {
      req.session.bookingIdSession=newBooking;
      res.send(200);

    }


  })
},
 //2.7.1 cancel booking
 //view bookiing method ??
cancelBooking: function(req,res){
  Booking.findOne({"_id":req.body._id}, function(err, booking){
    if(err){
      res.send(err);
    }
    else{
      if(req.body.time < newDate().getTime()){
        booking.remove().exec(function(err){
          if(err){
            res.send(err);
          }
          else{
            res.send("Booking is cancelled");
          }
        })
      }
    }
  })
}
}

module.exports=userCTRL;
