let ServiceProvider = require('../models/serviceProvider');
let User            = require('../models/user');
let Booking         = require('../models/booking');
let Activity        = require('../models/activity');
let Offer           = require('../models/offer');
let Account           = require('../models/account');



let visitorCTRL={
  //tested
//1.9
shareOnSocialMedia:function(req, res){
  //validating
  req.checkBody('url','url is required').isURL();
  req.checkBody('socialService','socialService is either facebook, twitter or google').isIn(["facebook","twitter","google"]);
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  switch(req.body.socialService){
	case 'facebook': res.redirect("https://www.facebook.com/sharer/sharer.php?u="+req.body.url);break;
	case 'twitter':  res.redirect("https://twitter.com/intent/tweet?text=check out this amazing activity here at "+req.body.url+" &url=YOUR-URL"+req.body.url);break;
	case 'google': res.redirect("https://plus.google.com/share?url="+req.body.url);break;
}
},

//1.5 As a visitor, I can search for activities either by name to find certain activities directly
//note search by date is still missing
searchForActivities:function(req,res){
  //validating
  req.checkBody('input','input is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  Activity.find({title:{$regex : ".*"+req.body.input+".*",$options : 'i' },type:{$regex : ".*"+req.body.input+".*",$options : 'i' }},function(err, activities){
    if(err)
    res.send(err.message);
    else
    res.send(activities);
  })
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
  //validating
  req.checkBody('providerId','providerId is required').isMongoId();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
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
	res.render("viewFAQ");
	//viewFAQ is a static HTML page
	},


registerAsUser:function(req, res){
  //validating
  req.checkBody('firstName','firstName is required and contain letters only').isAlpha();
  req.checkBody('lastName','lastName is required and contain letters only').isAlpha();
  req.checkBody('userAccountId','userAccountId is required').isMongoId();
  req.checkBody('birthDate','birthDate should be in  valid in the following format: 2017-04-20T00:00:00.000Z').isISO8601(); //check if the string is a valid ISO 8601 date.
  req.checkBody('age','age should be a postive number').optional().isInt({min:1,max:100});
  req.checkBody('gender','gender should be a Boolean').isBoolean();
  req.checkBody('privacy','privacy should be a number').isInt();
  req.checkBody('mobileNumber','mobileNumber should be numeric').isNumeric();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
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
,

signupForNewsletter:function(req,res){
  //validating
  req.checkBody('email','valid email is required').isEmail();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  let newAccount = new Account();
  newAccount.userName=newAccount._id;//visitor doesn't need to login to subscribe
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
  //validating
  req.checkBody('userName','userName is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  }
  //end validating
  Account.find({"userName": req.body.userName}, function(err, user){
    if(err){
      res.send(err);
    }
    else{
          if(!user){
            res.send("no account with this username");
          }
        var randomstring = require("randomstring");
        randomPass=randomstring.generate(12);//generating randompass
         user.password=user.generateHash(randomPass);
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
               html: "Your password for now is "+randomPass// You can choose to send an HTML body instead
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
