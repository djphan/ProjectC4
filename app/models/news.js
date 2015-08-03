var mongoose = require("mongoose");

var newsSchema = new mongoose.Schema({
	title: String,
	author: String,
	content: String,
	icon: String,
	lastUpdate: Date,
	created: Date
});

newsSchema.statics.getAllArticles = function(callback) {
	// -_id removes the ID from being returned
	return this.find({}, '-_id', callback).sort({"created": -1});
};

// Start: What date to start looking from
// Limit: How many articles to return
newsSchema.statics.getArticlesBeforeDate = function(startDate, limit, callback) {
	return this.find({createdOn: {$lte: startDate}}, '-_id', callback).limit(limit).sort({"created": -1});
};

module.exports = {
	News: mongoose.model('News', newsSchema)
};
