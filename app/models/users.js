// nerd model
var mongoose = require('mongoose');
var Schema       = mongoose.Schema;

var usersSchema   = new Schema({
    name: String
});
module.exports = mongoose.model('user', usersSchema);