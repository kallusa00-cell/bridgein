const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateCheckout } = require('../middleware/validation');

router.get('/', studentController.index);
router.get('/resources', studentController.resources);
router.get('/plus', studentController.plus);
router.get('/checkout', studentController.checkout);
router.post('/checkout', validateCheckout, studentController.processCheckout);

module.exports = router;
