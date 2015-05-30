//Define variables
var config = require('config.json')('./config.json');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , SteamStrategy = require('passport-steam').Strategy;
var http = require('http');

//Express
var express = require('express');
var app = express();

//Passport Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
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
    User.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  }
));

//Define the post strategies for each HTML login form
app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/failure'} ));

app.post('/login-steam',
  passport.authenticate('steam', { successRedirect: '/', failureRedirect: '/failure'} ));

//Gets for main page and failure to login
app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.get('/failure', function (req, res) {
  res.sendfile('failure.html');
});

//Gets for Steam Authentication
app.get('/auth/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//Serve everything
var server = app.listen(3000, function () {

  var host = '127.0.0.1';
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

