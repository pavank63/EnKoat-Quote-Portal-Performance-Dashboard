const Quote = require('../models/Quote');

exports.createQuote = async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllQuotes = async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
};

exports.getQuotesByState = async (req, res) => {
  const quotes = await Quote.find({ state: req.params.state });
  res.json(quotes);
};

exports.getQuotesByRoofType = async (req, res) => {
  const quotes = await Quote.find({ roofType: req.params.type });
  res.json(quotes);
};
