let ServiceProvider = require('../models/serviceProvider');
let User            = require('../models/user');
let Booking         = require('../models/booking');

let visitorCTRL={
//1.9
shareOnSocialMedia:function(req, res){
  switch(req.body.socialService){
	case 'facebook': res.redirect("https://www.facebook.com/sharer/sharer.php?u="+req.body.url);break;
	case 'twitter':  res.redirect("https://twitter.com/intent/tweet?text=check out this amazing activity here at "+req.body.url+" &url=YOUR-URL"+req.body.url);break;
	case 'google': res.redirect("https://plus.google.com/share?url="+req.params.query);break;
}
},
//1.2
viewAllServiceProviders:function(req, res){

ServiceProvider.find(	function(err, providers){
	
	if(err){

	     res.send(err.message);
            }else
              {
									res.send( providers);
							}
})

},

viewServiceProvider:function(req, res){

ServiceProvider.findOne({ _id :req.body.providerId})
.populate({path: 'activities', options:{sort:{'rating':-1}}})
.populate({path: 'branches'})
.populate({path: 'contactMobile'})
.populate({path: 'media'})
.populate({path: 'previousClients'})
.exec( function(err, provider){
if(err){

	     res.send(err.message);
            }else
              {
								Booking.find({serviceProviderId: req.body.providerId}).sort({'activityId':-1})
								.limit(1).exec(function(err,booking){
									

								})
									res.send(provider);
							}

})

},


viewFAQ:function(req,res){

res.render("viewFAQ", {});


},


registerAsUser:function(req, res){

let user=new User(req.body);
user.save(function(err, user){

if(err){

	     res.send(err.message);
            }else
              {
									res.redirect('/');
							}


})

}




}
module.exports = visitorCTRL;
