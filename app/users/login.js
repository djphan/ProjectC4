// Requirements
var config = require('config.json')('./config.json');
var bCrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SteamStrategy = require('passport-steam').Strategy;

var Users = require("./model").Users;

// Exports
module.exports.passport = passport;
module.exports.LocalStrategy = LocalStrategy;
module.exports.SteamStrategy = SteamStrategy;

// Serializers
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
        done(err, user);
    });
});

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}

// Local Strategy
passport.use(new LocalStrategy({
    passReqToCallback : true
  },

  function(req, username, password, done) {
    Users.findOne({ 'username': username }, function (err, user) {
      if (err) {
        console.log("Passport Local Strategy failled with error: " + err);
        return done(err);
      }
      if (!user) {
        return done(null, false, {message :
          'Username: ' + username + ' not foundjhj' });
      }
      console.log(user);
      if (!isValidPassword(user, password)) {
        return done(null, false, {message: 'Incorrect password'});
      }
      return done(null, user);
    });
  }
));

//Steam Strategy
passport.use(new SteamStrategy({
    returnURL: 'http://127.0.0.1:3000/',
    realm: 'http://127.0.0.1:3000/',
    apiKey: config.steamKey
  },
  function(identifier, profile, done) {
    Users.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  }
));
