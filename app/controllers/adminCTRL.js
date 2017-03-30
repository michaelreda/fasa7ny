let Complain = require('../models/complain');
let User = require('../models/user');
let ServiceProvider = require('../models/serviceProvider');
let Account = require('../models/account');

let adminCTRL={

  viewComplains:function(req,res){
    Complain.find(function(err, complain){

        if(err)
            res.send(err.message);
        else
            res.render('viewComplains',{complain});
    })
},

banForever:function(req,res){
if (req.body.isUserToProvider) {
ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:-1}}).exec(function(err){
  if(err)
      res.send(err.message);
  else
      res.render('ban successful'.send);

})
} else {
  User.update({_id:req.body.userId},{$set:{banned:-1}}).exec(function(err){
    if(err)
        res.send(err.message);
    else
        res.render('ban successful'.send);

  })

}
},
ban30Days:function(req,res){
if (req.body.isUserToProvider) {
ServiceProvider.update({_id:req.body.serviceProviderId},{$set:{banned:30}}).exec(function(err){
  if(err)
      res.send(err.message);
  else
      res.render('ban successful'.send);

})
} else {
  User.update({_id:req.body.userId},{$set:{banned:30}}).exec(function(err){
    if(err)
        res.send(err.message);
    else
        res.render('ban successful'.send);

  })

}
},
removeComplain:function(req,res){
Complain.findOne({_id:req.params.complainId},function(err,val){
  if(err){

  }
  else{
    if(val.isSeen){
  Complain.remove(val).exec(function(err){
    if(err)
        res.send(err.message);
    else
        res.render('complain deleted'.send);
      }
    }
})
})
},
viewServiceProviderRequests:function(req,res){
  ServiceProvider.find({isApproved:0},function(err,val){
    if(err)
          res.send(err.message);
      else
          res.render('viewServiceProviderRequests',{serviceProvider});
  })
},
acceptServiceProviderRequests:function(req,res){
  ServiceProvider.update({_id:req.body.userId},{$set:{Approved:1}}).exec(function(err){
    if(err)
          res.send(err.message);
      else
          res.send('approved successfully');
  })
},
rejectServiceProviderRequests:function(req,res){
  ServiceProvider.update({_id:req.body.userId},{$set:{Approved:-1}}).exec(function(err){
    if(err)
          res.send(err.message);
      else
          res.send('request rejected');
  })
},


adminLogin: function(req,res){
//var isValidPassword = function(user, password){
  //return bCrypt.compareSync(password, user.password);
//}
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, userName, password, done) {

    account.findOne({ 'userName' :  userName },
      function(err, user) {

        if (err)
          return done(err);  // In case of any error, return using the done method

        if (!user){
          console.log('User Not Found with userName '+userName); // userName does not exist, log error & redirect back
          return done(null, false,
                req.flash('message', 'user Not found.'));
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

module.exports = adminCTRL;