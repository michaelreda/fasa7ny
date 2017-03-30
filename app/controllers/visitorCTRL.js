let ServiceProvider = require('../models/serviceProvider');
let User            = require('../models/userr');


let visitorCTRL={
//1.9
shareOnSocialMedia:function(req, res){
  switch(req.body.socialService){
	case 'facebook': res.redirect("https://www.facebook.com/sharer/sharer.php?u="+req.body.url);break;
	case 'twitter':  res.redirect("https://twitter.com/intent/tweet?text=check out this amazing activity here at "+req.body.url+" &url=YOUR-URL"+req.body.url);break;
	case 'google': res.redirect("https://plus.google.com/share?url="+req.params.query);break;
}
},
//1.5 As a visitor, I can search for activities either by name to find certain activities directly
//note search by type or date is still missing
searchForActivities:function(req,res){
  Activity.find({title:{$regex : ".*"+req.body.input+".*",$options : 'i' }},function(err, activities){

    if(err)
    res.send(err.message);
    else
    res.send(activities);
  })
},
//1.2
viewAllServiceProviders:function(req, res){

ServiceProvider.find(function(err, providers){
	if(err){

	     res.send(err.message);
            }else
              {
									res.render('visitorView', {providers});
							}
})

},

viewServiceProvider:function(req, res){

ServiceProvider.findOne({ _id :req.body.ServiceProvider._id}, function(err, provider){
if(err){

	     res.send(err.message);
            }else
              {
									res.render('serviceProviderInfo', {provider});
							}

})

},


viewFAQ:function(req,res){

res.render("viewFAQ", {});


},


registerAsUser:function(req, res){


}




}
module.exports = visitorCTRL;
