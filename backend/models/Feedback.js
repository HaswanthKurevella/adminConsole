const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  username: String,
  problem: String,
  description: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);