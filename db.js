// Requirements
var mongoose = require('mongoose');

// DB Setup with Mongoose
var db = mongoose.connection;
var Schema = mongoose.Schema;
db.on('error', console.error);

// News
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

var News = mongoose.model('News', newsSchema);

// User
var userSchema = new mongoose.Schema({  
    username: String,
    password: String
});

var User = mongoose.model('User', userSchema);

// Mongoose 

});