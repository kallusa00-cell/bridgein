/**
 * Student Controller
 * Handles all student-facing pages and functionality
 */

exports.index = (req, res) => {
  const benefits = [
    {
      icon: '🎯',
      title: 'Hands-on Experience',
      description: 'Work on real projects that matter and build a portfolio that impresses employers.',
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Mentorship',
      description: 'Get guidance from industry professionals with decades of experience.',
    },
    {
      icon: '👥',
      title: 'Strong Community',
      description: 'Join a network of motivated students and alumni supporting each other.',
    },
    {
      icon: '🤝',
      title: 'Hands-on Matching',
      description: 'We actively match you with opportunities, not just a job board.',
    },
    {
      icon: '🎤',
      title: 'Mock Interviews',
      description: 'Practice with real interview scenarios and get actionable feedback.',
    },
    {
      icon: '⚡',
      title: '72-Hour Delivery',
      description: 'Pre-screened candidates delivered to employers within 72 hours.',
    },
  ];

  res.render('pages/students/index', {
    title: 'For Students - BridgeIn',
    description: 'Join BridgeIn to access mentorship, resources, and co-op opportunities matched to your career goals.',
    benefits,
  });
};

exports.resources = (req, res) => {
  const resources = {
    resume: [
      {
        id: 1,
        type: 'article',
        title: 'How to Write a Winning Tech Resume',
        description: 'Learn the key elements that make your resume stand out to recruiters.',
        duration: '8 min read',
        thumbnail: '/images/resources/resume-guide.jpg',
      },
      {
        id: 2,
        type: 'video',
        title: 'Resume Review: Common Mistakes to Avoid',
        description: 'Watch as our mentors review real student resumes and provide feedback.',
        duration: '15 min',
        thumbnail: '/images/resources/resume-review.jpg',
      },
      {
        id: 3,
        type: 'template',
        title: 'ATS-Friendly Resume Template',
        description: 'Download our proven resume template optimized for applicant tracking systems.',
        thumbnail: '/images/resources/resume-template.jpg',
      },
    ],
    coverLetter: [
      {
        id: 4,
        type: 'article',
        title: 'Cover Letters That Get Interviews',
        description: 'Discover the secret formula for cover letters that recruiters love.',
        duration: '6 min read',
        thumbnail: '/images/resources/cover-letter-guide.jpg',
      },
      {
        id: 5,
        type: 'video',
        title: 'Personalizing Your Cover Letter',
        description: 'Learn how to tailor your cover letter for each application effectively.',
        duration: '12 min',
        thumbnail: '/images/resources/cover-letter-video.jpg',
      },
    ],
    interview: [
      {
        id: 6,
        type: 'article',
        title: 'Mastering the STAR Method',
        description: 'Structure your interview answers for maximum impact using the STAR technique.',
        duration: '10 min read',
        thumbnail: '/images/resources/star-method.jpg',
      },
      {
        id: 7,
        type: 'video',
        title: 'Technical Interview Preparation',
        description: 'Prepare for coding interviews and technical assessments with confidence.',
        duration: '25 min',
        thumbnail: '/images/resources/tech-interview.jpg',
      },
      {
        id: 8,
        type: 'video',
        title: 'Behavioral Interview Questions Decoded',
        description: 'Learn how to answer the most common behavioral interview questions.',
        duration: '18 min',
        thumbnail: '/images/resources/behavioral-interview.jpg',
      },
    ],
  };

  res.render('pages/students/resources', {
    title: 'Free Resources - BridgeIn',
    description: 'Access free guides, videos, and templates to help you land your dream co-op placement.',
    resources,
  });
};

exports.plus = (req, res) => {
  const features = [
    {
      icon: '🎓',
      title: 'Top-Tier Mentorship',
      description: 'Get paired with an industry expert who will guide you through your career journey.',
    },
    {
      icon: '💼',
      title: 'Portfolio Projects',
      description: 'Build impressive projects with mentor guidance that showcase your skills to employers.',
    },
    {
      icon: '📝',
      title: 'Resume & LinkedIn Review',
      description: 'Get personalized feedback on your resume and LinkedIn profile from hiring managers.',
    },
    {
      icon: '🎯',
      title: 'Mock Interviews',
      description: 'Practice with realistic interview scenarios and receive detailed feedback.',
    },
    {
      icon: '🔥',
      title: 'Priority Matching',
      description: 'Jump to the front of the queue when employers are looking for candidates.',
    },
    {
      icon: '💬',
      title: '1-on-1 Career Coaching',
      description: 'Weekly sessions with your mentor to discuss progress and strategy.',
    },
  ];

  const testimonials = [
    {
      quote: 'The mentorship program completely transformed my job search. I landed my dream co-op within 3 weeks!',
      name: 'Student Name',
      role: 'Software Development Co-op',
      company: 'Tech Company',
      image: '/images/testimonials/placeholder.jpg',
    },
    {
      quote: "The portfolio project I built with my mentor's help was the main talking point in every interview.",
      name: 'Student Name',
      role: 'Data Analytics Co-op',
      company: 'Finance Company',
      image: '/images/testimonials/placeholder.jpg',
    },
  ];

  res.render('pages/students/plus', {
    title: 'BridgeIn Plus - Premium Mentorship Program',
    description: 'Join our intensive mentorship program to accelerate your career with personalized guidance from industry experts.',
    features,
    testimonials,
    pricing: {
      monthly: 20,
      description: 'Full access to mentorship, community, and priority matching',
    },
  });
};

exports.checkout = (req, res) => {
  res.render('pages/students/checkout', {
    title: 'Checkout - BridgeIn Plus',
    description: 'Complete your enrollment in the BridgeIn Plus mentorship program.',
    pricing: {
      monthly: 20,
      productName: 'BridgeIn Plus Membership',
    },
  });
};

exports.processCheckout = async (req, res) => {
  try {
    const { name, email, cardToken } = req.body;

    // TODO: Implement Stripe payment processing
    // For now, just simulate success
    console.log('Processing checkout for:', { name, email });

    res.json({
      success: true,
      message: 'Enrollment successful! Welcome to BridgeIn Plus.',
      redirectUrl: '/students/plus/success',
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during checkout. Please try again.',
    });
  }
};
