// nerd model
var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var Schema       = mongoose.Schema;
var debug = require('debug');

var userSchema   = new Schema({
    username: String,
    password: String,
    role: String,
    email: String,
    enabled: Boolean
});

// hash password for newest or updated user
userSchema.pre('save', function(next) {
   var user = this;
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function(err, salt){
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash){
               if (err) {
                   return next(err);
               }
               user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch){
    if (err) {
        debug(err);
        cb(err);
    }
    debug('password match');
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);