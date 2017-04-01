var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var Account = require('../models/account.js');
module.exports = function(passport) {

  // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'userName',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, userName, password, done) {

        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
        // we are checking to see if the user trying to login already exists
        Account.findOne({ 'userName' :  userName }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false);
            } else {
                // create the user
                var newUser  = new Account();


                newUser.userName    = userName;
                newUser.email    = req.body.email;
                newUser.type    = req.body.type;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

        });

    }));

    passport.use('local-login', new LocalStrategy({
         usernameField : 'userName',
         passwordField : 'password',
         passReqToCallback : true // allows us to pass back the entire request to the callback
     },
     function(req, userName, password, done) { // callback with email and password from our form

         // find a user whose email is the same as the forms email
         // we are checking to see if the user trying to login already exists
         Account.findOne({ 'userName' :  userName }, function(err, user) {
             // if there are any errors, return the error before anything else
             if (err)
                 return done(err);

             // if no user is found, return the message
             if (!user)
                 return done(null, false); // req.flash is the way to set flashdata using connect-flash

             // if the user is found but the password is wrong
             if (!user.validPassword(password))
                 return done(null, false); // create the loginMessage and save it to session as flashdata

             // all is well, return successful user
             return done(null, user);
         });

     }));

 };
