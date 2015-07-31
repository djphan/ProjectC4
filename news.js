// Requirements
var mongoose = require('mongoose');
var db = require('./db');

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

// Schema Definitions
var News = mongoose.model('News', newsSchema);

// Exports
module.exports.News = News;

module.exports = {


	newsSchema.statics.allOfTheArticles = function(callback) {
		// -_id removes the id from being returned
		return this.find({}, '-_id', callback).sort({ "created" : -1 });
	};
};
