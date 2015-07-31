var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , SteamStrategy = require('passport-steam').Strategy;

var 


module.exports = function(app) {

    // Serializers
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
 
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Local Strategy
    passport.use(new LocalStrategy({
        passReqToCallback : true
      },

      function(req, username, password, done) {
        //console.log("Starting Local Strat");
        User.findOne({ 'username': username }, function (err, user) {
          //console.log(user);
          //console.log("Execute Find One")
          if (err) {
            //console.log("all the errors"); 
            return done(err); 
          }
          if (!user) {
            //console.log("Bad Username with " + username);
            return done(null, false, { message: 'Incorrect username.' });
          }
          console.log(user);
          if (!isValidPassword(user, password)) {
            //console.log("Bad Password with user " + username);
            return done(null, false, { message: 'Incorrect pass.' });
          }
          //console.log("Done!");
          return done(null, user);
        });
      }
    ));



};