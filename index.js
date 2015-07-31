// Load Modules
var express = require('express');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Requirements
var config = require('config.json')('./config.json');
var db = require('./db');
var login = require('./login');

var fs = require('fs');
var http = require('http');
var https = require('https');

// SSL
//var privateKey  = fs.readFileSync('.ssh/c4esports.key.pem', 'utf8');
//var certificate = fs.readFileSync('.ssh/c4esports.cert.pem', 'utf8');
//var credentials = { key: privateKey, cert: certificate };

// App
var app = express();
app.use(express.static('public'));
app.use(bodyParser());
app.use(cookieParser());

// TODO: Try and Except or something Here.
db.connectDB();

// Passport
app.use(expressSession({secret: 'mySecretKey'}));
app.use(login.passport.initialize());
app.use(login.passport.session());

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

var httpServer = http.createServer(app)
//var httpsServer = https.createServer(credentials, app);

//TODO: Change Back to 80
httpServer.listen(8000, function() {
	console.log('Started HTTP on port 8000');
});
/*
httpsServer.listen(443, function() {
	console.log('Started HTTPS on port 443');
});
*/
