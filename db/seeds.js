var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TeamFight');


var User = require('../models/user');
// var Post = require('../models/post')
mongoose.Promise = global.Promise;


// First we clear the database of existing users and items.

User.remove({}, function(err){
  console.log(err);
});

// var test = new Post({
//   game: 'Overwatch',
//   Description: 'this is a test'
//
// });
// create new users
// var dan = new User({
//   first_name: 'Dan',
//   summoner_name: 'Komix',
//   email: 'ddmilo1029@gmail.com',
//   username: 'Komix',
//   password_digest: 'Arkahm29'
//
// });
//
//
// // save the users
// dan.save(function(err) {
//   if (err) console.log(err);
//
//   console.log('User created!');
// });

// test.save(function(err) {
//   if(err) console.log(err);
//
//   console.log('Post created!');
// });
