const { Quote } = require('../models');

// Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all quotes with optional filtering
exports.getQuotes = async (req, res) => {
  try {
    const { state, roofType } = req.query;
    const where = {};

    if (state) where.state = state;
    if (roofType) where.roofType = roofType;

    const quotes = await Quote.findAll({ where });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
