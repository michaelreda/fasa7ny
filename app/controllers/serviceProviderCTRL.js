let Activity = require('../models/activity.js');

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


























}

module.exports = ServiceProviderCTRL;
