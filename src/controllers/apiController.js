/**
 * API Controller
 * Handles API endpoints for AJAX requests
 */

exports.subscribe = async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // TODO: Add to mailing list (Mailchimp, SendGrid, etc.)
    console.log('New subscription:', { email, type, subscribedAt: new Date().toISOString() });

    res.json({
      success: true,
      message: 'Thank you for subscribing! Check your email for confirmation.',
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again.',
    });
  }
};

exports.contactSubmit = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.',
      });
    }

    // TODO: Send email, store in database
    console.log('Contact form submission:', { name, email, subject, message });

    res.json({
      success: true,
      message: 'Thank you for reaching out! We\'ll get back to you within 24 hours.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again.',
    });
  }
};

exports.healthCheck = (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
