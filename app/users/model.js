var mongoose = require('mongoose');

// Mongoose Definitions
var Schema = mongoose.Schema;

// UserSchema follows Kent's TestData
var userSchema = new Schema({
    username: String,
    university_email: String,
    display_name: String,
    admin: Boolean,
    password: String,
    school: { name: String, created: String, updated: String },
    created: String,
    accounts: {
      lol: {id: Number, name: String, level: Number }
    }

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
