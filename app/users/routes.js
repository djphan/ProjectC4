var Users = require("./model").Users;
var Login = require("./login");

module.exports = function(app) {

	// Passport Initalization
	app.use(Login.passport.initialize());
	app.use(Login.passport.session());

	// TODO: Fix this
	// Login Post Handling
	app.post('/login', Login.passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login.html',
		failureFlash : true
	}));

}
