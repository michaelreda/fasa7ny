let Activity = require('../models/activity.js');

let ServiceProviderCTRL = {

addActivity : function(req,res){
if(!req.body.title|!req.body.type|!req.body.prices|!req.body.duration|!req.body.timings|!req.body.minClientNumber|!req.body.maxClientNumber){
  res.send(404);
}
else{
let newActivity = new Activity({"title" :req.body.title,"type":req.body.type,"serviceProviderId":req.session.serviceProviderId,"prices":req.body.prices,"durationInMinutes":req.body.duration,"minClientNumber":req.body.minClientNumber,
"maxClientNumber":req.body.maxClientNumber,"media":[],"prices":[],"rating":0,"ratingCount":0});
if(req.files.length>0){
  for (var i = 0; i < req.files.length; i++) {
      newActivity.media.push({req.body.mediaTypes[i],req.files[i]});
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

}


}





}


module.exports = ServiceProviderCTRL;
