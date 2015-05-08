// Load Modules
var express = require('express');
var MobileDetect = require('mobile-detect');

var app = express();
app.set('view engine', 'jade');

// Routing
app.get('/', function (req, res) {
	res.render('index', req);
});
app.get('/css/:filename', function (req, res) {
	var filename = req.params.filename;
	res.sendFile('/home/kent/ProjectC4/css/' + filename);
});
app.get('/images/:filename', function (req, res) {
	var filename = req.params.filename;
	res.sendFile('/home/kent/ProjectC4/images/' + filename);
});

// Start
var server = app.listen(80, function() {
	var port = server.address().port;
	console.log('Started on port %s', port);
});
