var Users = require("./model").Users;
var Login = require("./login");
var Signup = require("./signup");

module.exports = function(app) {

	// Passport Initalization
	app.use(Login.passport.initialize());
	app.use(Login.passport.session());


	app.get('/data/users', function(req, res) {
		var username = res.username;
		var stuff = Users.getOneUser(username, function(error, user) {
			res.json(user);
		});
	});

	// Login Post Handling

	app.get('/login', function(req, res, next) {

	});

	app.post('/login', function(req, res, next) {
		Login.passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err); // 500 Error
			}
			if (! user) {
				//return res.json({ sucess: false, message: "loginfailed" });
				//return done(null, false, {message: 'login failed'});
				res.redirect('/#/login');
			}
			//return res.json({ sucess:true, message:"loginsucess"});
			//return done(null, false, {message: 'login sucess'});
			res.redirect('/');
		})(req, res, next);

	});


	/*
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
	*/

}
