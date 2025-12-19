/**
 * Employer Controller
 * Handles all employer-facing pages and functionality
 */

exports.index = (req, res) => {
  const benefits = [
    {
      icon: '💰',
      title: 'Save Up to 80%',
      description: 'Government subsidies cover 50-70% of student wages, up to $7,000 per placement.',
      highlight: true,
    },
    {
      icon: '⚡',
      title: '72-Hour Delivery',
      description: 'Receive a pre-screened shortlist of qualified candidates within 72 hours.',
    },
    {
      icon: '✅',
      title: 'Pre-Vetted Talent',
      description: 'All candidates complete project-based assessments proving their skills.',
    },
    {
      icon: '📊',
      title: 'Real-Time Tracking',
      description: 'Monitor candidate availability and status in real-time.',
    },
    {
      icon: '🎯',
      title: 'Hands-On Matching',
      description: "We actively match you with candidates, not just a job board.",
    },
    {
      icon: '📋',
      title: 'Agreement Support',
      description: 'We handle the paperwork with colleges and universities.',
    },
  ];

  const subsidyInfo = {
    standard: {
      percentage: 50,
      maxAmount: 5000,
      description: 'For standard co-op placements',
    },
    diversity: {
      percentage: 70,
      maxAmount: 7000,
      description: 'For underrepresented groups: women in STEM, Indigenous students, newcomers, persons with disabilities, visible minorities, first-year students',
    },
  };

  const processSteps = [
    {
      step: 1,
      title: 'Submit Your Requirements',
      description: 'Tell us about the role, skills needed, and your timeline.',
    },
    {
      step: 2,
      title: 'We Find Matches',
      description: 'Our team screens candidates and verifies their skills.',
    },
    {
      step: 3,
      title: 'Review Shortlist',
      description: 'Receive 3-5 pre-screened candidates within 72 hours.',
    },
    {
      step: 4,
      title: 'Interview & Hire',
      description: "Interview your top choices and make your selection.",
    },
    {
      step: 5,
      title: 'We Handle Paperwork',
      description: 'We assist with grant applications and college agreements.',
    },
  ];

  res.render('pages/employers/index', {
    title: 'For Employers - BridgeIn',
    description: 'Hire pre-screened co-op students and save up to 80% on wages through government subsidies.',
    benefits,
    subsidyInfo,
    processSteps,
  });
};

exports.contact = (req, res) => {
  res.render('pages/employers/contact', {
    title: 'Contact Us - BridgeIn',
    description: 'Get in touch with our team to learn how BridgeIn can help you find the perfect co-op student.',
    formSubmitted: false,
    errors: null,
  });
};

exports.submitContact = async (req, res) => {
  try {
    const {
      companyName,
      contactName,
      email,
      phone,
      companySize,
      industry,
      positions,
      timeline,
      message,
      diversityHiring,
    } = req.body;

    // Log the submission (replace with actual email/database storage)
    console.log('New employer contact submission:', {
      companyName,
      contactName,
      email,
      phone,
      companySize,
      industry,
      positions,
      timeline,
      message,
      diversityHiring: diversityHiring === 'on',
      submittedAt: new Date().toISOString(),
    });

    // TODO: Send email notification
    // TODO: Store in database

    res.render('pages/employers/contact', {
      title: 'Contact Us - BridgeIn',
      description: 'Thank you for your interest in BridgeIn!',
      formSubmitted: true,
      formData: { companyName, contactName },
      errors: null,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.render('pages/employers/contact', {
      title: 'Contact Us - BridgeIn',
      description: 'Get in touch with our team.',
      formSubmitted: false,
      errors: ['An error occurred. Please try again.'],
      formData: req.body,
    });
  }
};
