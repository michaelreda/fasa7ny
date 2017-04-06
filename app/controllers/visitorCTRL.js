let ServiceProvider = require('../models/serviceProvider');
let User            = require('../models/user');
let Booking         = require('../models/booking');
let Activity        = require('../models/activity');
let Offer           = require('../models/offer');
let Account           = require('../models/account');



let visitorCTRL={
//1.9
shareOnSocialMedia:function(req, res){
  switch(req.body.socialService){
	case 'facebook': res.redirect("https://www.facebook.com/sharer/sharer.php?u="+req.body.url);break;
	case 'twitter':  res.redirect("https://twitter.com/intent/tweet?text=check out this amazing activity here at "+req.body.url+" &url=YOUR-URL"+req.body.url);break;
	case 'google': res.redirect("https://plus.google.com/share?url="+req.params.query);break;
}
},
// 1.3 filtering activities
viewActivities:function(req,res){
      Activity.find(function(err,activities){
        if(err)
        {
            res.send(err.message);
        }else
        {
            res.send({activities})
        }
      })
    },

	filterActivitiesBy:function(req, res){
		req.session.j=1;
		if(req.body.filter==price)
		{
			Activity.find.limit(10).exec({ price: req.body.value},function(err,activities){
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
.exec( function(err, provider){
  if(err){
	res.send(err.message);
     }else   {
			Booking.aggregate(
				{$group: {_id: req.body.activityId, count: {sum:1}}},
				{$sort: {count:-1}},
				{$limit: 1},
				(function(err,booking)
				{
				if(err){
					res.sen(err.message);
				}
				else{
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
				}	})
			)}
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
//tested but not prev and next methods
    getDifferentActivities:function(req,res){
  req.session.j=1;
Activity.find().limit(10).exec(function(err,ACs)
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
Activity.find().limit(10).skip((req.session.j-1)*10).exec(function(err,ACs)
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

Activity.find().limit(10).skip((req.session.j-1)*10).exec(function(err,Acs)
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
,

signupForNewsletter:function(req,res){
  let newAccount = new Account();
  newAccount.userName=newAccount._id;
  newAccount.password=newAccount._id;
  newAccount.email=req.body.email;
  newAccount.type=2;
  newAccount.save(function(err){
    if(err)
    res.send(err);
    else {
      res.send(200);
    }
  })
},

//2.1.2 recover password
recoverPassword:function(req,res){

  Account.find({"userName": req.body.userName}, function(err, user){
    if(err){
      res.send(err);
    }
    else{
         user.password='00000000';
         user.save(function(err){
           if(err){
             res.send(err);
           }
           else{
             var transporter = nodemailer.createTransport(smtpTransport({
               service: 'Hotmail',
               auth: {
                 user: 'fasa7ny@outlook.com', // Your email id
                 pass: 'ITJumoynyoj1' // Your password
               }
             }));

             var mailOptions = {
               from: 'fasa7ny@outlook.com', // sender address
               to: user.email, // list of receivers
               subject: 'Change Password', // Subject line
               //text: text //, // plaintext body
               html: "Your password for now is 00000000"// You can choose to send an HTML body instead
             };
             transporter.sendMail(mailOptions, function(error, info){
               if(error){
                 console.log(error);
                 res.send(error);
               }else{
                 console.log('Message sent: ' + info.response);
                 res.redirect(200);
               };
             });
           }
         })



    }
  })

}



}
module.exports = visitorCTRL;
