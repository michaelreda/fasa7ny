let account = require('../models/account.js');
let user = require('../models/user.js');



let userCTRL = {


login: function(req,res){

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
//2.11 As a logged in user I can change my privacy to control who sees my information
changePrivacy: function(req,res){
  if(req.body.privacy<0 || req.body.privacy>2)
    res.send("privacy should be 0,1 or 2");
  user.update({_id:req.session.user._id},{$set:{privacy:req.body.privacy}}).exec(function(err){
    if(err){
      res.send(err)
    }else{
      res.send("privacy changed succesfully");
    }
  })
},
subscribe: function(req,res){
  var serviceProviderID=req.session.serviceProviderID._id;
  var loggedInUser= req.session.loggedInUser._id;

  serviceProvider.findOne({ '_id' : serviceProviderID},
    function(err, providerInstance){
      if (err){
        return (err);
      }
      else{
        providerInstance.subscribedUsers.push(loggedInUser);
        providerInstance.save(function(err){
          if(err){
            return (err);
          }
          else {
            req.flash('message', 'You are now subscribed to this provider');
          }
        })
      }
    }
)
}

}

module.exports=userCTRL;
