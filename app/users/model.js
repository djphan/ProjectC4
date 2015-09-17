var mongoose = require('mongoose');

// Mongoose Definitions
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    contactemail: String,
    schoolemail: String,
});

// Start: What date to start looking from
// Limit: How many articles to return
userSchema.statics.getOneUser = function(input, callback) {
	return this.find({ username: input }, '-_id -password -__v', callback);
};


// Export
module.exports = {
  Users: mongoose.model('Users', userSchema)
};
