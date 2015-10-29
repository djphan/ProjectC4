var mongoose = require('mongoose');

// Mongoose Definitions
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    admin: Number,
    school: String,
    contactemail: String,
    schoolemail: String,
    created: String,
    accounts: {
      leauge: {id: Number, name: String, level: Number }
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
