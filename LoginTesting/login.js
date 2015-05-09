//Define variables
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var http = require('http');

//Express
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

var server = app.listen(3000, function () {

  var host = '127.0.0.1';
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

//Passport Generate
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

//Redirects
app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

//Authenticate
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

