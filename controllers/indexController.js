var express = require('express');
var router = express.Router();
var authHelpers = require('../helpers/auth.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TeamFight' });
});


module.exports = router;
