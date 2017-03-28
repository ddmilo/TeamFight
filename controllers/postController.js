var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post')
var authHelpers = require('../helpers/auth.js')

//======================
// CREATE
//======================
router.get('/', function(req, res){
  res.render('posts/index', {
    Posts: Post
  });
});





module.exports = router;
