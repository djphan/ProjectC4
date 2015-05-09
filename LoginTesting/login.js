//Define variables
var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
var http = require('http');

//Express
var express = require('express');
var app = express();

//Redirects
app.post('/login',
  passport.authenticate('local', { successRedirect: '/success', failureRedirect: '/failure' }));

app.get('/', function (req, res) {
	res.sendfile('index.html');
});

app.get('/failure', function (req, res) {
  res.sendfile('failure.html');
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