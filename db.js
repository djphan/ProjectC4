// Requirements
var mongoose = require('mongoose');

// DB Setup with Mongoose
var connection = mongoose.connection;
connection.on('error', console.error);

//Exports
module.exports = {
	connectDB: function() {
		// Connect to MongolDB
		mongoose.connect('mongodb://localhost/test', function(err, res) {
			if(err) {
				console.log("Error connecting to MongoDB. Error: " + err);
				return -1;
			} else {
				console.log("Connected to MongoDB!");
				return 1;
			}
		});
	}
};
