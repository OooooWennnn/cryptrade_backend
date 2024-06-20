const express = require('express');
const router = express.Router();

const {
  getAllCoins_Ndax,
  fetchTickerHistory,
} = require('../controllers/trade_controller');

router.get('/', getAllCoins_Ndax);

router.post('/history', fetchTickerHistory);

module.exports = router;
