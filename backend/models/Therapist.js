const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  username: String,
  mobileNumber: String,
  email: String,
  password: String,
  qualification: String,
});

module.exports = mongoose.model('Therapist', therapistSchema);