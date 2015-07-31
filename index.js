// Load Modules
var express = require('express');
var expressSession = require('express-session');
var mongoose = require('mongoose');
<<<<<<< HEAD
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes 
var config = require('steamconfig.json')('./steamconfig.json');
var db = require('./db');
var login = require('./login')(app);
=======
var fs = require('fs');
var http = require('http');
var https = require('https');

// SSL
var privateKey  = fs.readFileSync('.ssh/c4esports.key.pem', 'utf8');
var certificate = fs.readFileSync('.ssh/c4esports.cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// App
var app = express();
app.use(express.static('public'));

// Database Setup
var db = mongoose.connection;
var Schema = mongoose.Schema;
db.on('error', console.error);
var newsSchema = new Schema({
	article: {
		title: String,
		author: String,
		content: String,
		icon: String,
		lastUpdate: Date,
		created: Date
	}
});
newsSchema.statics.allOfTheArticles = function(callback) {
	// -_id removes the id from being returned
	return this.find({}, '-_id', callback).sort({ "created" : -1 });
};
>>>>>>> fa71d033bf1b7ca6ea0b6c4614ca7d84289059d8

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
var httpServer = http.createServer(app)
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80, function() {
	console.log('Started HTTP on port 80');
});
httpsServer.listen(443, function() {
	console.log('Started HTTPS on port 443');
});
