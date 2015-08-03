module.exports = function(app) {
	app.get('/data/ip', function(req, res) {
		res.json({ip: req.ip, hostname: req.hostname});
	});
}
