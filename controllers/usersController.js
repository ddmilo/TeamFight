var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authHelpers = require('../helpers/auth.js')

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({})
  .exec(function(err, users){
    if (err) { console.log(err); }
    res.render('users/index', { users: users });
  });
});

//SHOW: create a GET "/:id" route that shows the page ONLY IF it's the current user's session. Else, redirect to an error page that says "Oops! You are not authorized."
router.get("/:id", function(req, res) {
  User.findById(req.params.id)
    .exec(function(err, user) {
      if (err) { console.log(err); }
      res.render("users/show", {
        users: user
      });
    });
});

//CREATE User registration
//Auth stuff: POST "/" save username, email, and password
router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User({
    email: req.body.email,
    password_digest: res.hashedPassword,
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  });

  user.save(function(err, user){
    if (err) console.log(err);
    console.log(user);
    console.log(req.session.currentUser);
    res.redirect('/sessions/login');
  });
});

//Edit User
router.get("/:id/edit", function(req, res) {
	User.findById(req.params.id)
		.exec(function(err, user) {
			if (err) { console.log(err); }
			res.render("users/edit", {
				users: user

			});
		});
});

//======================
// UPDATE
//======================
//create a PUT "/:id" route that saves the changes from the list.
//update User
router.patch('/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, req.body, { new: true})
  .exec(function(err, user){
    if (err) { console.log(err); }
    console.log(user);
    res.redirect('/users')
  });
});


//render the register page
router.get('/register', function(req, res){
  res.render('users/register');
});






module.exports = router;
