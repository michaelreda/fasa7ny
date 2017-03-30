let account = require('../models/account.js');
let account = require('../models/serviceProvider.js');



//routing not yet

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

changePassword: function(req,res){
  var thisUser=req.session.loggedInUser.userAccountId;
  account.findOne({'_id':thisUser},
      function(err, userInstance){
        if(err){
          return (err);
        }
        else{
          //account.update.......update password
        }
      }
)
},

//From Tweety recover password



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
