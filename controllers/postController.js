var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var authHelpers = require('../helpers/auth.js')

//Index Route
router.get('/', function(req, res){
  Post.find({})
    .exec(function(err, posts){
      if (err) { console.log(err); }
      res.render('posts/index', {
        posts: posts
      })
    })
})

router.get('/new', function(req, res){
  User.findById(req.params.id)
    .exec (function(err, user){
      if (err) {console.log(err); }
      res.render('posts/new');
    })
})

//======================
// CREATE
//======================
//create a POST "/" route that saves the list item to the logged in user
router.post("/", function(req, res) {
	var newPost = new Post({
    game: req.body.game,
    description: req.body.description,
    party_leader: req.body.party_leader
  });

  newPost.save(function(err, post){
    if (err) console.log(err);
    console.log(post);
    console.log(req.session.currentUser);
    res.redirect('/posts');
  });
});

//Edit post
router.get("/:id/edit", function(req, res) {
	Post.findById(req.params.id)
		.exec(function(err, post) {
			if (err) { console.log(err); }
			res.render("posts/edit", {
				posts: post

			});
		});
});

//Post Show route
router.get("/:id", function(req, res) {
  Post.findById(req.params.id)
    .exec(function(err, post) {
      if (err) { console.log(err); }
      res.render("posts/show", {
        posts: post
      });
    });
});






module.exports = router;
