// Load Modules
var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
var mongoose = require('mongoose');
var config = require('config.json')(__dirname + '/config/config.json');

// Express setup
var app = express();
// Serve static content from the public directory
app.use(express.static(__dirname + '/public'));

// Mongo & Mongoose setup
mongoose.connection.on('error', console.error);
mongoose.connect('mongodb://localhost/test', function(err) {
  if(err) {
    console.log("Error connecting to MongoDB. Error: " + err);
    process.exit(1);
  } else {
    console.log("Connected to MongoDB!");
  }
});

// Load routes for each application
fs.readdirSync(__dirname + '/app').forEach(function(folder) {
  require(__dirname + '/app/' + folder + '/routes')(app);
});

// Serve requests (HTTP)
var httpServer = http.createServer(app);
httpServer.listen(config.http.port, function() {
  console.log('Started HTTP on port ' + config.http.port);
});

// Serve requests (HTTPS)
fs.exists(__dirname + '/config/key.pem', function (exists) {
  if(exists) {
    // SSL Key Exists
    fs.exists(__dirname + '/config/cert.pem', function(exists) {
      if(exists) {
        // SSL certificate exists
        // Start HTTPS server
        var privateKey  = fs.readFileSync(__dirname + '/config/key.pem', 'utf8');
        var certificate = fs.readFileSync(__dirname + '/config/cert.pem', 'utf8');
        var credentials = {key: privateKey, cert: certificate};
        var httpsServer = https.createServer(credentials, app);
        httpsServer.listen(config.https.port, function() {
          console.log('Started HTTPS on port ' + config.https.port);
        });
      } else {
        // SSL certificate not found
        console.warn("config/cert.pem not found, not enabling HTTPS");
      }
    });
  } else {
    // SSL key not found
    console.warn("config/key.pem not found, not enabling HTTPS");
  }
});
