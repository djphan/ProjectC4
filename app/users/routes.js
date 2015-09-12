var Users = require("./model").Users;
var Login = require("./login");
var Signup = require("./signup");

module.exports = function(app) {

	// Passport Initalization
	app.use(Login.passport.initialize());
	app.use(Login.passport.session());

	app.get('/#/login', function(req, res) {
		res.render('login', { loginmsg: "YOH" })
	});

	// Login Post Handling
	app.post('/login', Login.passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/#/login',
		failureFlash : true
	}));

	app.post('/signup', Signup.passport.authenticate('signup', {
		successRedirect: '/#/login',
		failureRedirect: '/#/signup',
		failureFlash : true
	}));

}
