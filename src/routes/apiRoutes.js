const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/subscribe', apiController.subscribe);
router.post('/contact', apiController.contactSubmit);
router.get('/health', apiController.healthCheck);

module.exports = router;
