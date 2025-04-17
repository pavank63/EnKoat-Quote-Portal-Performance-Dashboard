const express = require('express');
const router = express.Router();
const {
  createQuote,
  getAllQuotes,
  getQuotesByState,
  getQuotesByRoofType
} = require('../controllers/quotesController');

router.post('/', createQuote);
router.get('/', getAllQuotes);
router.get('/state/:state', getQuotesByState);
router.get('/rooftype/:type', getQuotesByRoofType);

module.exports = router;
