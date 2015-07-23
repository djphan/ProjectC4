// Load Modules
var express = require('express');
var mongoose = require('mongoose');

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


app.get('/data/ip', function(req, res) {
	res.json({ ip: req.ip, hostname: req.hostname });
});

var News = mongoose.model('News', newsSchema);
mongoose.connect('mongodb://localhost/test', function(err, res) {
	if(err) {
		console.log("Error connecting to MongoDB. Error: " + err);
	} else {
		console.log("Connected to MongoDB!");
	}
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
