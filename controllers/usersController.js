var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authHelpers = require('../helpers/auth.js')

//Index Route
router.get('/', function(req, res) {
  User.find({})
  .exec(function(err, users){
    if (err) { console.log(err); }
    res.render('users/index', { users: users });
  });
});

//render the register page
router.get('/signup', function(req, res){
  res.render('users/signup');
});

//User Show route
router.get("/:id", function(req, res) {
  User.findById(req.params.id)
    .exec(function(err, user) {
      if (err) { console.log(err); }
      res.render("users/show", {
        users: user
      });
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
// ======================
// UPDATE
// ======================
// create a PUT "/:id" route that saves the changes from the list.
// update User
router.patch('/:id', function(req, res) {
   User.findByIdAndUpdate(req.params.id, {
     email: req.body.email,
     summoner_name: req.body.summoner_name,
     first_name: req.body.first_name,
     last_name: req.body.last_name
   }, {new: true})
       .exec(function(err, user) {
           if (err) { console.log(err); }
           console.log(user);
           res.render('users/show', {
               users: user
           });
       });
});

// USER DESTROY
router.delete('/:id', function(req, res){
  User.findByIdAndRemove(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log('User deleted!');
    // res.send("User deleted");
    res.redirect('/');
  });
});


//CREATE User registration & Auth stuff

router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User({
    email: req.body.email,
    password_digest: res.hashedPassword,
    summoner_name: req.body.summoner_name,
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












module.exports = router;
