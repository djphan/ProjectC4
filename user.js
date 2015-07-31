var mongoose = require('mongoose');
var db = require('./db');

// Mongoose Definitions
var Schema = mongoose.Schema;

// User
// TODO: Fix This (July 30 2015)
var userSchema = new Schema({
    username: String,
    password: String
});

var Users = mongoose.model('User', userSchema);

// Export
module.exports.Users = Users;

// Mongoose
