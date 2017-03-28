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
       first_name: req.body.first_name,
       last_name: req.body.last_name
      //  town: req.body.town,
      //  state: req.body.state,
      //  rate: req.body.rate,
      //  description: req.body.description,
      //  length: req.body.length
   }, {new: true})
       .exec(function(err, user) {
           if (err) { console.log(err); }
           console.log(users);
           // res.send(hike);
           res.render('/users', {
               users: user
           });
       });
});


//CREATE User registration & Auth stuff

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












module.exports = router;
