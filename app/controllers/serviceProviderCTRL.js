let ServiceProvider = require('../models/serviceProvider');
let Account = require('../models/account');


let serviceProviderCTRL = {


   createServiceProviderAccount:function(req, res){
        let account = new Account(req.body);
        account.type=1;
        account.save(function(err, account){
            if(err){
                res.send(err.message);
            }
            else{
                req.session.account=account;
                res.send(200);
            }
        });
    },
     createServiceProvider:function(req, res){
        let serviceProvider = new ServiceProvider(req.body);
        serviceProvider.serviceProviderAccountId=req.session.account._id;
        serviceProvider.save(function(err, account){
            if(err){
                res.send(err.message);
            }
            else{
                req.session.serviceProviderID=serviceProvider._id;
                res.send(200);
            }
        });
    },


    //3.1 Login as a service Provider

serviceProviderLogin: function(req,res){

//var isValidPassword = function(user, password){
  //return bCrypt.compareSync(password, user.password);
//}

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, userName, password, done) {

    Account.findOne({ 'userName' :  userName },
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
}



    };

module.exports = serviceProviderCTRL;