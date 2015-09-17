var Users = require("./model").Users;
var Login = require("./login");
var Signup = require("./signup");

module.exports = function(app) {

	// Passport Initalization
	app.use(Login.passport.initialize());
	app.use(Login.passport.session());


	app.get('/data/users', function(req, res) {
		var username ="hello";
		var stuff = Users.getOneUser(username, function(error, user) {
			res.json(user);
		});
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
