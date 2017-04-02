let ServiceProvider = require('../models/serviceProvider');
let User            = require('../models/user');
let Booking         = require('../models/booking');
let Activity        = require('../models/activity');
let Offer           = require('../models/offer');



let visitorCTRL={
//1.9
shareOnSocialMedia:function(req, res){
  switch(req.body.socialService){
	case 'facebook': res.redirect("https://www.facebook.com/sharer/sharer.php?u="+req.body.url);break;
	case 'twitter':  res.redirect("https://twitter.com/intent/tweet?text=check out this amazing activity here at "+req.body.url+" &url=YOUR-URL"+req.body.url);break;
	case 'google': res.redirect("https://plus.google.com/share?url="+req.params.query);break;
}
},

	filterActivitiesBy:function(req, res){
		req.session.j=1;
		if(req.body.filter==price)
		{
			Activity.find.limit(10).exec({prices: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		} else 	if(req.body.filter==offer)
		{
			Activity.find.limit(10).exec({isOffer: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}else 	if(req.body.filter==location)
		{
			Activity.find.limit(10).exec({location: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}
		else 	if(req.body.filter==theme)
		{
			Activity.find.limit(10).exec({theme: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}
		else 	if(req.body.filter==ratingCount)
		{
			Activity.find.limit(10).exec({ratingCount: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}


	},

	filterActivitiesByNext:function(req, res){
		req.session.j++;
		if(req.body.filter==price)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({prices: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		} else 	if(req.body.filter==offer)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({isOffer: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}else 	if(req.body.filter==location)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({location: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}
		else 	if(req.body.filter==theme)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({theme: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}
		else 	if(req.body.filter==ratingCount)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({ratingCount: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}


	},



	filterActivitiesByPrev:function(req, res){
		if(req.session.j!=1){
        req.session.j--;}
		if(req.body.filter==price)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({prices: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		} else 	if(req.body.filter==offer)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({isOffer: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}else 	if(req.body.filter==location)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({location: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}
		else 	if(req.body.filter==theme)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({theme: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}
		else 	if(req.body.filter==ratingCount)
		{
			Activity.find.limit(10).skip((req.session.j-1)*10).exec({ratingCount: req.body.value},function(err,activities){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activities});
                    }
                })
		}


	},
//1.2
viewAllServiceProviders:function(req, res){
if(!req.session.pageID){
	req.session.pageID=1;

}
if(req.body.page){
	req.session.pageID=req.body.page;
}

ServiceProvider.find().skip(10*(req.session.pageID-1)).limit(11).populate({path:'activities'}).exec(function(err, providers){
	
	if(err){

	     res.send(err.message);
            }else
              {
					res.send(providers);
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
     }else   {
			Booking.find({serviceProviderId: req.body.providerId}).sort({'activityId':-1})
			.limit(1).exec(function(err,booking){
			Activity.findOne({_id:booking.activityId},function(err,bestSelledActivity){
				if(err){
			    	res.send(err.message);
					   }
					else{
					Offer.find().sort({'_id':-1}).limit(1).populate({path: 'activities'}).exec(function(err, hottestOffer){
						if(err){
						res.send(err.message);
							}
							else{
							res.send({provider,bestSelledActivity, hottestOffer});
							}
								})				
									//res.send({provider,bestSelledActivity});
								}
								})	
								})
							}
})
},


viewFAQ:function(req,res){
	res.render("viewFAQ", {});
	//viewFAQ is a static HTML page
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
},

//1.1 explore differet activities

    getDifferentActivities:function(req,res){
  req.session.j=1;
Acitivity.find().limit(10).exec(function(err,Acs)
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
},

getDifferentActivitiesnext:function(req,res){
  req.session.j++;
Acitivity.find().limit(10).skip((req.session.j-1)*10).exec(function(err,Acs)
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
},

getDifferentActivitiesprev:function(req,res){
  if(req.session.J!=1){
      req.session.j--;
  }

Acitivity.find().limit(10).skip((req.session.j-1)*10).exec(function(err,Acs)
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

}
module.exports = visitorCTRL;
