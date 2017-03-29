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

//Create post
router.get('/new', function(req, res){
  User.findById(req.params.id)
    .exec (function(err, user){
      if (err) {console.log(err); }
      res.render('posts/new');
    })
})

router.post("/", function(req, res) {
	var newPost = new Post({
    looking_for: req.body.looking_for,
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

//create comment


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

// update POST
router.patch('/:id', function(req, res) {
   Post.findByIdAndUpdate(req.params.id, {
     description: req.body.description
   }, {new: true})
       .exec(function(err, post) {
           if (err) { console.log(err); }
           console.log(post);
           res.render('posts/show', {
               posts: post
           });
       });
});

// POST DELETE
router.delete('/:id', function(req, res){
  Post.findByIdAndRemove(req.params.id)
  .exec(function(err, post) {
    if (err) console.log(err);
    // console.log('User deleted!');
    // res.send("User deleted");
    res.redirect('/posts');
  });
});





module.exports = router;
