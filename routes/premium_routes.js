const express = require('express');
const router = express.Router();

const {
  getAllCoins_Ndax,
  getAllCoins_Bithum,
} = require('../controllers/premium_controller');

router.get('/Ndax', getAllCoins_Ndax);
router.get('/Bithum', getAllCoins_Bithum);

module.exports = router;
