const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  contractorName: String,
  company: String,
  roofSize: Number,
  roofType: String,
  city: String,
  state: String,
  projectDate: Date
});

module.exports = mongoose.model('Quote', QuoteSchema);
