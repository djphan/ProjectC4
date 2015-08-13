// Load Modules
var express = require('express')
	, expressSession = require('express-session')
	, flash = require('express-flash')
	,	cookieParser = require('cookie-parser')
	,	bodyParser = require('body-parser')
	, fs = require('fs')
	, http = require('http')
	, https = require('https');

// Requirements
var db = require('./db')
	,	login = require('./login')
	, news = require('./news');

/*
	For local development comment out all the SSL certificates
*/
// SSL
//var privateKey  = fs.readFileSync('.ssh/c4esports.key.pem', 'utf8');
//var certificate = fs.readFileSync('.ssh/c4esports.cert.pem', 'utf8');
//var credentials = { key: privateKey, cert: certificate };

// App
var app = express();
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

// Start
/*
	For Local development use the var server shown here.
*/
//Serve everything
var server = app.listen(3000, function () {

  var host = '127.0.0.1';
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

/*
	For local development comment out the httpServers seen here.
*/

//var httpServer = http.createServer(app)
//var httpsServer = https.createServer(credentials, app);

/*
httpServer.listen(80, function() {
	console.log('Started HTTP on port 80');
});

httpsServer.listen(443, function() {
	console.log('Started HTTPS on port 443');
});
*/
