var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user.js');

function createSecure(req, res, next) {
  var password = req.body.password;

  res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  next();
}

function loginUser(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email })
  .then(function(foundUser){
    if (foundUser == null) {
      res.json({status: 401, data: "unauthorized"});

    } else if (bcrypt.compareSync(password, foundUser.password_digest)) {
      req.session.currentUser = foundUser;
    }
    next();
  })
  .catch(function(err){
    res.json({status: 500, data: err});
  });
}

function authorized(req, res, next) {
  console.log(req.session.currentUser);
  console.log(req.params.id)
  if (!req.session.currentUser || req.session.currentUser._id !== req.params.id) {
    return res.json({status: 404, data: "unauthorized"});
  }
  next();
};

//Export this function below:

module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorized: authorized
};
