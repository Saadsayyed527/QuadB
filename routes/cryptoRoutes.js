const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.get('/fetch', cryptoController.fetchAndStoreCryptos);

router.get('/', cryptoController.getCryptos);

module.exports = router;
