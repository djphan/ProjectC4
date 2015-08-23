// Load Modules
var express = require('express')
var expressSession = require('express-session')
var flash = require('express-flash')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var fs = require('fs')
var http = require('http')
var https = require('https');
var mongoose = require('mongoose');

// Requirements
var db = require('./db')

/*
	For local development comment out all the SSL certificates
*/
// SSL
//var privateKey  = fs.readFileSync('.ssh/c4esports.key.pem', 'utf8');
//var certificate = fs.readFileSync('.ssh/c4esports.cert.pem', 'utf8');
//var credentials = { key: privateKey, cert: certificate };

// App
var app = express();

// Serve static content from the public directory
app.use(express.static('public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(flash());

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
	var stuff = news.allOfTheArticles(function(error, articles) {
		res.json(articles);
	});
});

// App Post Handling
app.post('/login', login.passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login.html',
	failureFlash : true
}));


});

/*
	For local development comment out the httpServers seen here.
*/

//var httpServer = http.createServer(app)
//var httpsServer = https.createServer(credentials, app);

/*
// SSL
var privateKey  = fs.readFileSync('config/key.pem', 'utf8');
var certificate = fs.readFileSync('config/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// Mongo & Mongoose setup
mongoose.connection.on('error', console.error);
mongoose.connect('mongodb://localhost/test', function(err) {
	if(err) {
		console.log("Error connecting to MongoDB. Error: " + err);
	} else {
		console.log("Connected to MongoDB!");
	}
});

// Load routes for each application
fs.readdirSync('./app').forEach(function(folder) {
	require('./app/' + folder + '/routes')(app);
});

// Serve requests
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(80, function() {
	console.log('Started HTTP on port 80');
});

httpsServer.listen(443, function() {
	console.log('Started HTTPS on port 443');
});
*/

// Start
// For Local development use the var server shown here.
/*
*/
var server = app.listen(3000, function () {

  var host = '127.0.0.1';
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
