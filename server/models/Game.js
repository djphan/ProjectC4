var mongoose = require('mongoose');

//create gameSchema
var GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

//Export the model schema
module.exports = GameSchema;
