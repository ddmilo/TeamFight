var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var authHelpers = require('../helpers/auth.js')

//Index Route
router.get('/', function(req, res){
  res.render('posts/index')
});

//======================
// CREATE
//======================
//create a POST "/" route that saves the list item to the logged in user
router.post("/", function(req, res) {
	User.findById(req.params.userId)
		.exec(function(err, user) {
			if (err) { console.log(err); }
			var newPost = new Post({
				description: req.body.description,
				game: req.body.game
			});
			newPost.save();
			user.post.push(newPost);
			user.save();
			res.redirect(`/posts`)
		});
});

module.exports = router;
