var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var PostSchema = new Schema ({
  created_at: Date,
  game_id: String,
  updated_at: Date
})


var UserSchema = new Schema ({
  first_name: String,
  last_name: String,
  summoner_name: String,
  email: String,
  username: String,
  password_digest: String,
  created_at: Date,
  updated_at: Date
});


PostSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;

  if (!this.created) {this.created_at = now}
  next();
});


UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;

  if (!this.created) {this.created_at = now}
  next();
});


var UserModel = mongoose.model('User', UserSchema);
var PostModel = mongoose.model('Post', PostSchema)


module.exports= {
  User: UserModel
  Post: PostModel
}
