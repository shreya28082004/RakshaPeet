const mongoose = require('mongoose');

const GuardSchema = new mongoose.Schema({
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  phone:      { type: String, required: true },
  email:      { type: String },  // optional — no `required: true`
  password:   { type: String, required: true },
  status:     { type: String, default: 'free' },  // free / busy / on-duty (as needed)
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Guard', GuardSchema);