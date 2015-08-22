var News = require("./model").News;

module.exports = function(app) {
	app.get('/data/news', function(req, res) {
		// Show all of the news articles for now
		// TODO: Pagination?
		var stuff = News.getAllArticles(function(error, articles) {
			res.json(articles);
		});
	});
}
