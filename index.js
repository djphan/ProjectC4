// Load Modules
var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
var mongoose = require('mongoose');

// Express setup
var app = express();
// Serve static content from the public directory
app.use(express.static('public'));
// SSL
var privateKey  = fs.readFileSync('config/key.pem', 'utf8');
var certificate = fs.readFileSync('config/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// Mongo & Mongoose setup
mongoose.connection.on('error', console.error);
mongoose.connect('mongodb://localhost/test', function(err, res) {
	if(err) {
		console.log("Error connecting to MongoDB. Error: " + err);
	} else {
		console.log("Connected to MongoDB!");
	}
});

// Load routes
require('./app/routes')(app);

// Serve requests
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(80, function() {
	console.log('Started HTTP on port 80');
});
httpsServer.listen(443, function() {
	console.log('Started HTTPS on port 443');
});
