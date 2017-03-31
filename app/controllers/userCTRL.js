let Activity = require('../models/activity');
let ServiceProvider = require('../models/serviceProvider');
let account = require('../models/account.js');
let message=require('../models/message.js');

let userCTRL = {

//2.6 comparing activities or service providers
getActivitiesToCompare:function(req, res){

        Activity.findOne({_id: req.body.activity1ID},function(err,activity1){

            if(err)
                res.send(err.message);
            else{

                Activity.findOne({_id: req.body.activity2ID},function(err,activity2){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({activity1,activity2});
                    }
                })


            }
        })
    },
    //2.6 comparing activities or service providers
    getServiceProviderToCompare:function(req, res){

        ServiceProvider.findOne({_id: req.body.SP1ID},function(err,SP1){

            if(err)
                res.send(err.message);
            else{

                ServiceProvider.findOne({_id: req.body.SP2ID},function(err,SP2){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({SP1,SP2});
                    }
                })


            }
        })
    },
    //2.6 comparing activities or service providers
    getFirstListOfChoices:function(req, res){

        ServiceProvider.find(function(err,SPs){

            if(err)
                res.send(err.message);
            else{

                Activity.find(function(err,ACs){
                    if(err){
                        res.send(err.message);
                    }else {
                            res.send({SPs,ACs});
                    }
                })


            }
        })
    },
    //2.6 comparing activities or service providers
    getSecondListOfChoices:function(req, res){
      if(isServiceProvider)
      {
          ServiceProvider.find(function(err,SPs)
          {

            if(err)
            {
                res.send(err.message);
            }
            else
            {
                res.send({SPs});
            }
          })
      }
      else
      {
          Activity.find(function(err,ACs)
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
    },

    //2.1 user login
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

//2.1.1 user changes password
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


//2.4 user subscribes to a service provider
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
},

//2.13 user contacts platform
/*contactPlatform: function (req,res){
  var logInUser=req.session.loggedInUser._id;
  let message=new message();
  message.fromId=logInUser;
  message.
  message.isSeen

  message.save()
}*/



    };

module.exports = userCTRL;
