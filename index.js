// Load Modules
var express = require('express');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes 
var config = require('steamconfig.json')('./steamconfig.json');
var db = require('./db');
var login = require('./login')(app);

var app = express();

// Connect to MongolDB
mongoose.connect('mongodb://localhost/test', function(err, res) {
	if(err) {
		console.log("Error connecting to MongoDB. Error: " + err);
	} else {
		console.log("Connected to MongoDB!");
	}
}

// App use expressions
app.use(express.static('public'));
app.use(bodyParser());
app.use(cookieParser());

// Passport
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/data/ip', function(req, res) {
	res.json({ ip: req.ip, hostname: req.hostname });
});

app.get('/data/news', function(req, res) {
	var articleList = [];
	var stuff = News.allOfTheArticles(function(error, articles) {
		res.json(articles);
	});
});

// Start
var server = app.listen(80, function() {
	var port = server.address().port;
	console.log('Started on port %s', port);
});
