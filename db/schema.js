var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var UserSchema = new Schema ({
  first_name: String,
  last_name: String,
  summoner_name: String,
  email: String,
  username: String,
  password: String,
  created_at: Date,
  updated_at: Date
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;

  if (!this.created) {this.created_at = now}
  next();
});


var UserModel = mongoose.model('User', UserSchema);


module.exports= {
  User: UserModel
}
