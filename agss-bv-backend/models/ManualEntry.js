// models/ManualEntry.js
const mongoose = require('mongoose');

const manualEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/   // ensures 10-digit phone number
  },
  idProof: {
    type: String,
    enum: ['Aadhaar', 'PAN', 'DL'],  // allowed ID types
    required: true
  },
  reasonForVisit: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true }); // adds createdAt and updatedAt

// Create and export the model
const ManualEntry = mongoose.model('ManualEntry', manualEntrySchema);
module.exports = ManualEntry;
