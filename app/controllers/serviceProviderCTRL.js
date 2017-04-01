let Activity = require('../models/activity.js');
let ServiceProvider = require('../models/serviceProvider');
let Account = require('../models/account');
let Offer = require('../models/offer');

let ServiceProviderCTRL = {
//As a service provider I shall add activities that my firm provides so that I can schedule them for my clients.
addActivity : function(req,res){
if(!req.body.title|!req.body.type|!req.body.prices|!req.body.duration|!req.body.timings|!req.body.minClientNumber|!req.body.maxClientNumber){
  res.send(404);
}
else{
let newActivity = new Activity({"title" :req.body.title,"type":req.body.type,"serviceProviderId":req.session.serviceProviderId,"prices":req.body.prices,"timings":req.body.timings,"durationInMinutes":req.body.duration,"minClientNumber":req.body.minClientNumber,
"maxClientNumber":req.body.maxClientNumber,"media":[],"prices":[],"rating":0,"ratingCount":0});
if(req.files.length>0){
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
  if(err){console.log(err);
  }
  else {
    res.send(200);
  }

});


}

},

//3.2.1 As a service provider I can update my activities
updateActivity:function(req,res){
  Activity.findOne({"_id":req.session.activityID},function(err, activity){
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

    if(req.files.length>0){
      activity.media=[];
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
        res.send(200);
      }

    });
  });
},
//3.2.2 As a service provider I can delete my activities
deleteActivity: function(req,res){
    Activity.findOne({"_id":req.session.activityID}).remove().exec(function(err){
      if(err){
        res.send(err);
      }
      else {
        res.send(200);
      }
    })

},
//3.2.3 As a service provider I can reschedule my activities
rescheduleActivity:function(req,res){
  Activity.findOne({"_id":req.session.activityID},function(err, activity){

    if(req.body.duration){
    activity.durationInMinutes=req.body.duration;
    }

    if(req.body.timings&&req.body.timings.length>0){
      activity.timings=req.body.timings;
    }

    activity.save(function(err){
      if(err){console.log(err);
      }
      else {
        res.send(200);
      }

    });
  });
},


  createServiceProviderAccount:function(req, res){
        let account = new Account(req.body);
        account.type=1;
        account.save(function(err, account){
            if(err){
                res.send(err.message);
            }
            else{
                req.session.account=account;
                res.send(200);
            }
        });
    },
     createServiceProvider:function(req, res){
        let serviceProvider = new ServiceProvider(req.body);
        serviceProvider.serviceProviderAccountId=req.session.account._id;
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


    //3.1 Login as a service Provider

serviceProviderLogin: function(req,res){

//var isValidPassword = function(user, password){
  //return bCrypt.compareSync(password, user.password);
//}

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

viewAddOffer: function(req,res){
        ServiceProvider.findOne({_id: req.session.serviceProvider._id})
        .populate({path: 'activities'})
        .exec(function(err,provider){
            
        })

        res.render('viewAddOffer',provider.activities);
    },
    AddOffer:function(req,res){
        let offer = new Offer(req.body);
        offer.save(function(err,offer){
            if(err){
                res.send(err.message);
            }else{
                //ServiceProvider.update({_id: req.session.serviceProvider._id},{$push: {}})
                res.send('offer added');//same redirection as update
            }
        })
    },

    deleteOffer:function(req,res){
        Offer.findOne({_id:req.body.offerId},function(err,offer){
        if(err){

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
    updateOffer: function (req, res) {
        Offer.update({ _id: req.body.offerId }, { $set: { 'title': req.body.title,'description': req.body.description,'discount': req.body.discount,
        'deadline': req.body.deadline,'activities': req.body.activities,'isActive': req.body.isActive }})
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

    applyToGolden:function(req,res){
        ServiceProvider.update({_id:req.session.serviceProvider._id},{$set: {'isGolden': true}}).exec(function(){
            res.send('should redirect to serviceProvider home page');
        });
    }


















}

module.exports = ServiceProviderCTRL;
