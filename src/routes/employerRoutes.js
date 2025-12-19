const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController');
const { validateEmployerContact } = require('../middleware/validation');

router.get('/', employerController.index);
router.get('/contact', employerController.contact);
router.post('/contact', validateEmployerContact, employerController.submitContact);

module.exports = router;
