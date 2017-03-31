
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


	}


}
module.exports = visitorCTRL;
