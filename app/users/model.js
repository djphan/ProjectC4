var mongoose = require('mongoose');

// Mongoose Definitions
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    contactemail: String,
    schoolemail: String,
    password: String
});

// Export
module.exports = {
  Users: mongoose.model('Users', userSchema)
};
