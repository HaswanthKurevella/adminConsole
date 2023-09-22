const mongoose = require('mongoose');
const TherapistSchema = new mongoose.Schema({
    name: String,
    password: String})
const TherapistModel = mongoose.model('therapists', TherapistSchema);
module.exports = TherapistModel;