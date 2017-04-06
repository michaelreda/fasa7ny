let Account = require('../models/account.js');
let User = require('../models/user.js');
let ServiceProvider = require('../models/serviceProvider.js');
let Activity = require('../models/activity');
let Message=require('../models/message.js');
let Booking=require('../models/booking.js');
let Interest=require('../models/interest');
let Complain=require('../models/complain');
let globalCTRL=require('../controllers/globalCTRL.js');

let userCTRL = {
  //used to test if the user is logged or not
  isUser: function(req,res){
    if(!req.session.user)
      res.send("you are not logged in.. you are not authorized to do this function");
  },

//2.6 comparing activities or service providers
//tested
getActivitiesToCompare:function(req, res){
 userCTRL.isUser(req,res);
  //validating
  req.checkBody('activity1ID','activity1ID is required').isMongoId();
  req.checkBody('activity2ID','activity2ID is required').isMongoId();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
        Activity.findOne({_id: req.body.activity1ID},function(err,activity1){

            if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
            }else{
                if(!activity1)
                  res.send("activity 1 not found");
                Activity.findOne({_id: req.body.activity2ID},function(err,activity2){
                    if(err){
                        globalCTRL.addErrorLog(err.message);
                        res.send(err.message);
                    }else {
                      if(!activity2)
                        res.send("activity 2 not found");
                      res.send({activity1,activity2});
                    }
                })


            }
        })
    },
    //2.6 comparing activities or service providers
    //tested
    getServiceProviderToCompare:function(req, res){
      //validating
      req.checkBody('SP1ID','SP1ID is required').isMongoId();
      req.checkBody('SP2ID','SP2ID is required').isMongoId();
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating
        ServiceProvider.findOne({_id: req.body.SP1ID},function(err,SP1){

            if(err){
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
            }else{

                ServiceProvider.findOne({_id: req.body.SP2ID},function(err,SP2){
                    if(err){
                        globalCTRL.addErrorLog(err.message);
                        res.send(err.message);
                    }else {
                            res.send({SP1,SP2});
                    }
                })


            }
        })
    },
    //2.6 comparing activities or service providers
    //tested
    getFirstListOfChoices:function(req, res){

        ServiceProvider.find(function(err,SPs){

            if(err){
              globalCTRL.addErrorLog(err.message);
                res.send(err.message);
            }else{

                Activity.find(function(err,ACs){
                    if(err){
                        globalCTRL.addErrorLog(err.message);
                        res.send(err.message);
                    }else {
                            res.send({SPs,ACs});
                    }
                })


            }
        })
    },
    //2.6 comparing activities or service providers
    //tested
    getSecondListOfChoices:function(req, res){
      //validating
      req.checkBody('isServiceProvider','SP1ID is required').isBoolean();
      req.sanitize('isServiceProvider').toBoolean(); //converting to boolean in case it's a string
      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      }
      //end validating
      if(req.body.isServiceProvider)
      {
          ServiceProvider.find(function(err,SPs)
          {

            if(err)
            {
                globalCTRL.addErrorLog(err.message);
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
                globalCTRL.addErrorLog(err.message);
                res.send(err.message);
            }
            else
            {
                res.send(ACs);
            }
          })

      }
    },


//2.1.1 user changes password
changePassword: function(req,res){
  userCTRL.isUser(req,res);
  //validating
  req.checkBody('oldPassword','oldPassword is required').notEmpty();
  req.checkBody('newPassword','newPassword is required').notEmpty();
  req.checkBody('newPassword','newPassword minimum length is 6').isLength({min:6});
  req.checkBody('confirmPassword','confirmPassword is required').notEmpty();
  req.checkBody('confirmPassword','confirmPassword should be equal to the new password').equals(req.body.newPassword);
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  var thisUser=req.session.user.userAccountId;
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


//2.11 As a logged in user I can change my privacy to control who sees my information
//tested
changePrivacy: function(req,res){
  userCTRL.isUser(req,res);
  //validating
  req.checkBody('privacy','privacy should be 0,1 or 2').isInt({min:0,max:2});
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  User.update({_id:req.session.user._id},{$set:{privacy:req.body.privacy}}).exec(function(err,status){
    if(err){
      globalCTRL.addErrorLog(err.message);
      res.send(err)
    }else{
      if(status.nModified!=0)
        res.send("privacy changed succesfully");
      else
        res.send('user not found');
    }
  })
},


//2.4 user subscribes to a service provider
//tested -notes
subscribe: function(req,res){
  userCTRL.isUser(req,res);
  var serviceProviderID=req.session.serviceProvider._id;
  var loggedInUser= req.session.user._id;


  ServiceProvider.findOne({ '_id' : serviceProviderID},
    function(err, providerInstance){
      if (err){
        globalCTRL.addErrorLog(err.message);
        return (err);
      }
      else{
        providerInstance.update({_id:req.session.serviceProvider._id},{$push:{'subscribedUsers':loggedInUser}},function(err,change){
          if(err)
          {
            res.send(err.message)
          }else{
            res.send({providerInstance});
          }
        });
        // providerInstance.save(function(err){
        //   if(err){
        //     globalCTRL.addErrorLog(err.message);
        //     return (err);
        //   }
        //   else {
        //     res.send("You are now subscribed to this provider");
        //   }
        // })
      }
    }
)
},




//2.13 user contacts platform
//tested
contactPlatform: function (req,res){
  userCTRL.isUser(req,res);
  //validating
  req.checkBody('message','message is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  var logInUser=req.session.user._id;
  Message.findOne({fromId:logInUser}).exec(function(err, message){
    if(err){
      globalCTRL.addErrorLog(err.message);
      res.send(err);
    }
    else{
      if(!message){
        let msg=new Message();
        msg.fromId=logInUser;
        msg.message=[{"isUser":true, "message":req.body.message, "time":new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}];
        msg.isSeen=false;
        message=msg;
      }
      else{
        message.message.push({"isUser":true, "message":req.body.message, "time":new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')});
        message.isSeen=false;

      }

message.save(function(err){
  if(err){
    globalCTRL.addErrorLog(err.message);
  console.log(err);
}else {
    res.send(200);
  }
})



    }
  })

},




//2.2 As a logged in user I can view
//tested
viewMyProfile: function(req,res){
  userCTRL.isUser(req,res);
  User.findOne({_id:req.session.user._id}).exec(function(err,user){
    if(err){
      globalCTRL.addErrorLog(err.message);
      res.send(err);
    }
    else {
      res.send(user);
    }
  })
},


// user id for testing 58e695140fb1c32c4d7eaabd
//service provider id for testing 58e0323c244cdb4ebbe85687


//2.2 As a logged in user I can update my personal info
//not tested - notes
//password to be done later
updateMyProfile: function(req,res){
    //userCTRL.isUser(req,res);
    User.update({_id:"58e695140fb1c32c4d7eaabd"}).exec(function(err,status){
      if(err){
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        if(status.nModified!=0)
          res.send("profile updated successfully");
        else
          res.send('user not found');

      }
    })

},
//2.2.1 As a logged in user I can delete my account
//will be tested when all is done
deleteMyProfile: function(req,res){
   userCTRL.isUser(req,res);
    User.findOne({_id:req.session.user._id}).remove().exec(function(err){
      if(err){
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        res.send("profile deleted successfully");
      }
    })

}
,
userAddToWishList:function(req,res){
  //not tested yet
  userCTRL.isUser(req,res);
User.update({_id: req.session.user._id}, {$push: {'wishlist' : req.body.activity}}).exec(function(err,status){
  if(status.nModified!=0)
    res.send('should redirect to userLoggedinHomepage')
  else
    res.send('user not found');

});

},

userDropFromWishList:function(req, res){
  userCTRL.isUser(req,res);
User.update({_id: req.session.user._id}, {$pull: {'wishlist' : req.body.activity}}).exec(function(err,status){
  if(status.nModified!=0)
    res.send('should redirect to userLoggedinHomepage')
  else
    res.send('user not found');
});
},
  //2.3 As a logged in user I can rate/review activities after check-in
  //thus in the view we should handle to hide rating ability unless u checked in
  rateReviewActivity: function(req,res){
    userCTRL.isUser(req,res);
    //validating
    req.checkBody('rating','rating is required >1 and <5').isDecimal({min:1,max:5});
    req.checkBody('inputRating','inputRating is required >1 and <5').isInput({min:1,max:5});
    req.checkBody('ratingCount','ratingCount is required').isInt();
    req.checkBody('activityId','activityId is required').isMongoId();
    req.checkBody('review','review is not empty').optional().notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    var rating= parseFloat(req.body.rating);
    var ratingCount = parseFloat(req.body.ratingCount);
    var inputRating = parseFloat(req.body.inputRating);

    var newRating = (rating*ratingCount + inputRating)/(ratingCount+1);

    Activity.update({_id:req.body.activityId},{$set:{'rating':newRating,'ratingCount':ratingCount}}).exec(function(err){
      if(err)
      res.send(err.message);
      else {
        if(req.body.review){
          var review= new Review(req.body);
          review.rate = inputRating;
          review.save(function(err,review){
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
    userCTRL.isUser(req,res);
    //validating
    req.checkBody('activityId','activityId is required').isMongoId();
    req.checkBody('review','review is not empty').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    Review.update({_id:req.body.activityId},{$set:{review:req.body.review}}).exec(function(err,status){
      if(err){
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        if(status.nModified!=0)
          res.send("review updated successfully");
        else
          res.send('review not found');
      }
    })

  },

  //2.3.2 As a logged in user I can delete my review
  deleteReview: function(req,res){
    userCTRL.isUser(req,res);
    //validating
    req.checkBody('activityId','activityId is required').isMongoId();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    Review.findOne({_id:req.body.activityId}).remove().exec(function(err){
      if(err){
        globalCTRL.addErrorLog(err.message);
        res.send(err);
      }
      else {
        res.send("review deleted successfully");
      }
    })},

    //2.3.3 As a logged in user I can check/view my review
    viewMyReviews: function(req,res){
      userCTRL.isUser(req,res);
      Review.find({userId:req.session.user._id}).populate('activityId').exec(function(err,reviews){
        if(err){
          globalCTRL.addErrorLog(err.message);
          res.send(err);
        }
        else {
          res.send(reviews);
        }
      })


  },

  viewHistoryBookings: function(req,res){
    userCTRL.isUser(req,res);
  Booking.find({userId:req.session.user._id}).exec(function(err,bookings){
    if(err){
      globalCTRL.addErrorLog(err.message);
      res.send(err);
    }
    else {
      res.render("viewHistoryBookings",bookings);
    }
  })
},
 //2.7 reserve a booking for an activity
bookActivity:function(req,res){
  userCTRL.isUser(req,res);
  //validating
  req.checkBody('activityId','activityId is required').isMongoId();
  req.checkBody('serviceProviderId','serviceProviderId is required').isMongoId();
  req.checkBody('price','price is required').isInt({min:0});
  req.checkBody('time','time is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating

  //req. is of type activity
  let newBooking=new Booking();
  newBooking.userId=req.session.user._id;
  newBooking.serviceProviderId=req.body.serviceProviderId;
  newBooking.activityId=req.body.activityId;
  newBooking.isHolding=true;
  newBooking.price=req.body.price; //chosen act is with price in the req
  newBooking.time=req.body.time; //chosen activity is with time from the req.

  res.redirect("paymentPage", {"booking":newBooking});
  // where payment method will be called

  newBooking.save(function(err){
    if(err){
      globalCTRL.addErrorLog(err.message);
    console.log(err);
  }else {
      req.session.bookingSession=newBooking;
      res.send(200);

    }


  })
},
 //2.7.1 cancel booking
 //view bookiing method ??
cancelBooking: function(req,res){
  userCTRL.isUser(req,res);
  //validating
  req.checkBody('bookingID','bookingID is required').isMongoId();
  req.checkBody('time','time is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  Booking.findOne({"_id":req.body.bookingID}, function(err, booking){
    if(err){
      globalCTRL.addErrorLog(err.message);
      res.send(err);
    }
    else{
      //checking if activity is still away for more than 24h
      if(Date.pasre(req.body.time).getTime() < newDate().getTime()){
        booking.isCancelled=true;
        booking.save(function(err){
          if(err){
            globalCTRL.addErrorLog(err.message);
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
,
//2.8 user Complain serviveprovider
//tested
viewComplains:function(req,res){
  userCTRL.isUser(req,res);
      Complain.find(function(err,complains){
        if(err)
        {
          globalCTRL.addErrorLog(err.message);
          res.send(err.message);
        }
        else
        {
          res.send({complains});
        }
      })
  },



  submitUserComplain:function(req,res){
    userCTRL.isUser(req,res);
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
    complain.userId= req.session.user._id;
    complain.isUserToProvider= true;
    complain.save(function(err,complain){
      if(err)
      {
        globalCTRL.addErrorLog(err.message);
        res.send(err.message);
      }else {
        res.send(complain)
      }
    })
  },
      //tested 
  viewStatusOfComplain:function(req,res){
    userCTRL.isUser(req,res);
    //validating
    req.checkBody('complainId','complainId is required').isMongoId();
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    //end validating
    Complain.findOne({_id: req.body.complainId},function(err,comp){
      if(err)
      {
        globalCTRL.addErrorLog(err.message);
        res.send(err.message)
      }else{
        res.send({comp});
      }



    })},

   updateComplainBody:function(req, res){
     userCTRL.isUser(req,res);
     //validating
     req.checkBody('complainId','complainId is required').isMongoId();
      req.checkBody('complainBody','complainBody is required').notEmpty();
     var errors = req.validationErrors();
     if (errors) {
       res.send(errors);
       return;
     }
     //end validating
       Complain.update({_id:req.body.complainId},{$set:{complain:req.body.complainBody}},function(err,status){
                if(err)
                {
                    globalCTRL.addErrorLog(err.message);
                    res.send(err.message);
                }else
                {

                  if(status.nModified!=0)
                    res.send("complain updated successfully");
                  else
                    res.send('complain not found');
                }
       })
    },



//2.5 user add his interests
// tested


      addUserInterest:function(req,res){
        userCTRL.isUser(req,res);
        //validating
        req.checkBody('name','name is required').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
          res.send(errors);
          return;
        }
        //end validating
        let interest = new Interest(req.body);

        interest.save(function(err,interest){
      if(err)
      {
        globalCTRL.addErrorLog(err.message);
        res.send(err.message);
      }else {
        res.send(interest)
      }
    })

      },

      deleteUserInterest:function(req,res){
        userCTRL.isUser(req,res);
        //validating
        req.checkBody('interestId','interestId is required').isMongoId();
        var errors = req.validationErrors();
        if (errors) {
          res.send(errors);
          return;
        }
        //end validating
                Interest.remove({_id:req.body._id},function(err,removed){
          if(err)
          {
            globalCTRL.addErrorLog(err.message);
            res.send(err.message);
          }
          else
          {
            res.send(200);
          }
        })
      },

      viewAllUserInterest:function(req,res){
        userCTRL.isUser(req,res);
        Interest.find(function(err,interest){
          if(err){
            globalCTRL.addErrorLog(err.message);
            res.send(err);
          }
          else {
            res.send({interest});
          }
        })
      }

      ,
      unSubscribe: function(req,res){
        userCTRL.isUser(req,res);
        var serviceProviderID=req.body.serviceProviderId;
        var loggedInUser= req.session.user._id;


        ServiceProvider.findOne({ '_id' : serviceProviderID},
          function(err, providerInstance){
            if (err){
              globalCTRL.addErrorLog(err.message);
              return (err);
            }
            else{
              var index = providerInstance.subscribedUsers.indexOf(loggedInUser);
              if(index > -1){
                providerInstance.subscribedUsers.splice(index,1);
              providerInstance.save(function(err){
                if(err){
                  globalCTRL.addErrorLog(err.message);
                  return (err);
                }
                else {
                  req.flash('message', 'You are now unsubscribed from this provider');
                }
              })
            }
            }
          }
      )
    },


  userLoginStep2: function(req,res){
      User.findOne({userAccountId:req.user._id}).exec(function(err,thisUser){
        if(err){
          globalCTRL.addErrorLog(err.message);
          res.send(err);
        }
        else {
          if(!thisUser){
          globalCTRL.addErrorLog('Account '+req.user._id+'has no user profile!!');
          res.redirect('/logout');
        }
        else {
          if(thisUser.banned==0){
            thisUser.numberOfLogins++;
            thisUser.save(function(err2){
              if(err2)
              globalCTRL.addErrorLog(err.message);
            })
            req.session.user=thisUser;
            res.send("user is logged in");
          }
          else{
            res.send('Account banned! try again in '+thisUser.banned+' days');
          }
        }

        }

      });



  },
  userSignupStep2: function(req,res){

    req.checkBody('firstName','first name is required').notEmpty();
    req.checkBody('lastName','last name is required').notEmpty();
    req.checkBody('birthDate','birth date is required').notEmpty();
    req.checkBody('gender','gender is required of type boolean').notEmpty().isBoolean();
    req.checkBody('privacy','privacy is required of type integer').notEmpty().isInt({min:1});
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    }
    else {
            let newUser= new User();
            newUser.firstName=req.body.firstName;
            newUser.lastName=req.body.lastName;
            newUser.birthDate=req.body.birthDate;
            newUser.gender=req.body.gender;
            newUser.privacy=req.body.privacy;
            newUser.userAccountId=req.user._id;
            newUser.interests=[];
            newUser.history=[];
            newUser.location=[];
            newUser.banned=0;
            newUser.wishlist=[];


            if(req.body.mobileNumber){
              newUser.mobileNumber=req.body.mobileNumber;
            }
            if(req.files&&req.files.length>0){
              newUser.profilePicture=req.files[0].path;
            }
            if(req.body.profession){
              newUser.profession=req.body.profession;
            }

            newUser.save(function(err){
                if(err){
                  globalCTRL.addErrorLog(err.message);
                  res.send(err);
                }
                else {
                  res.send('signup step 2 succesfull!!');
                }

              });
            }

},

findUsers:function(req,res){

  User.find(function(err,users){
    if(err)
    {
      res.send(err.message)
    }else{
      res.send({users})
    }
  })
}



}

module.exports=userCTRL;
