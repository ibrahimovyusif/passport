var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Please Log In' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Create an Account' });
});

router.get('/dashboard', function(req, res, next) {
	if(!req.user){
		req.flash('error', 'You are not logged in');
		res.render('login', { title: 'Please Log In' });
	}else{
		res.render('dashboard', { title: 'Dashboard', layout: 'dashboard_layout'});
	}
});

router.post('/register', function(req, res, next){
	console.log('yusif');
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Must be valid email address').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	//req.checkBody('password2', 'Passwords should match').equals(req.body.password);
    req.checkBody('password2', 'Password2 field is required').notEmpty();
	var errors = req.validationErrors();

	if(errors){
		console.log("index, line 37");
		res.render('register',{
			errors: errors
		});
	} else{
		console.log('index, line 42');
		passport.authenticate('local-register', {
			successRedirect:'/dashboard',
			failureRedirect: '/',
			failureFlash: true
		}) (req, res, next);
	}
});
router.post('/login', function(req, res, next){
	var username = req.body.username;
	var password = req.body.password;

	passport.authenticate('local-login', {
		successRedirect:'/dashboard',
		failureRedirect: '/',
		failureFlash:true
	})(req, res, next);
})


router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'You are now logget out');
	res.redirect('/');
});


module.exports = router;
