// Requirements
var bCrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SteamStrategy = require('passport-steam').Strategy;

var Users = require("./model").Users;

module.exports.passport = passport;
module.exports.LocalStrategy = LocalStrategy;

// Helper Functions
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// Registration
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },

  function(req, username, password, done) {
    findOrCreateUser = function(){
      Users.findOne( {'username' : username}, function(err, user) {
        if (err) {
          console.log('Error with SignUp' +  err);
          return done(err);
        }

        // User Exists
        if (user) {
          console.log("Username " + user + " exists!");
          return done(null, false,
            req.flash('message' , "Username " + user + " exists!" ));
        } else {
          var newUser = new Users();
          newUser.username = username;
          newUser.password = createHash(password);

          newUser.save(function(err) {
            if (err) {
              console.log('Error: ' + err);
              throw err;
            }
            console.log('Sucess!');
            return done(null, newUser);
          });
        }
      });
    };
    process.nextTick(findOrCreateUser);
  })
);
