var mongoose = require('mongoose');

// Mongoose Definitions
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    contactemail: String,
    schoolemail: String,
    password: String
});

var Users = mongoose.model('User', userSchema);

// Export
module.exports.Users = Users;
