const express = require('express');
const router = express.Router();
const { getFullPortfolio } = require('../controllers/portfolioController');

router.get('/', getFullPortfolio);

module.exports = router;
