// Requirements
var mongoose = require('mongoose');

// Mongoose Definitions
var Schema = mongoose.Schema;

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
}

// Fetches News from MongolDB
var News = mongoose.model('News', newsSchema);

// Exports to index.js
module.exports = {
	// Function used to fetch all the news articles.
	allOfTheArticles : function(error, articles) {
		News.allOfTheArticles(error, articles);
	}
};
