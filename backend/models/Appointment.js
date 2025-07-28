const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  reason: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);