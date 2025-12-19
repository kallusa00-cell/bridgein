const { body, validationResult } = require('express-validator');

// Validation for employer contact form
exports.validateEmployerContact = [
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),

  body('contactName')
    .trim()
    .notEmpty()
    .withMessage('Contact name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Contact name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Please provide a valid phone number'),

  body('companySize')
    .notEmpty()
    .withMessage('Company size is required'),

  body('industry')
    .notEmpty()
    .withMessage('Industry is required'),

  body('positions')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Number of positions must be between 1 and 100'),

  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Message must be less than 2000 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('pages/employers/contact', {
        title: 'Contact Us - BridgeIn',
        description: 'Get in touch with our team.',
        formSubmitted: false,
        errors: errors.array().map((e) => e.msg),
        formData: req.body,
      });
    }
    next();
  },
];

// Validation for checkout
exports.validateCheckout = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((e) => e.msg),
      });
    }
    next();
  },
];

// Validation for newsletter subscription
exports.validateSubscription = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((e) => e.msg),
      });
    }
    next();
  },
];
