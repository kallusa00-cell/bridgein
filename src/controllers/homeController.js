/**
 * Home Controller
 * Handles the main landing page and general pages
 */

exports.index = (req, res) => {
  res.render('pages/home', {
    title: 'BridgeIn - Connecting Students with Career Opportunities',
    description: 'BridgeIn helps post-secondary students find quality co-op placements while saving employers up to $10,000 on hiring costs through government subsidies.',
  });
};

exports.about = (req, res) => {
  const teamMembers = [
    {
      name: 'Placeholder Name',
      role: 'Founder & CEO',
      bio: 'Decades of experience in talent acquisition and workforce development.',
      image: '/images/team/placeholder.jpg',
    },
    // Add more team members as needed
  ];

  // removed because client thought this was more for an investor audience
  // const stats = [
  //   { value: '5M+', label: 'Students in Canada' },
  //   { value: '300K+', label: 'GTA Students' },
  //   { value: '72hrs', label: 'Average Matching Time' },
  //   { value: '$7,000', label: 'Max Subsidy Available' },
  // ];

  res.render('pages/about', {
    title: 'About Us - BridgeIn',
    description: 'Learn about BridgeIn\'s mission to connect students with meaningful co-op opportunities.',
    teamMembers,
    // stats, <--- REMOVED THIS LINE
  });
};

exports.notFound = (req, res) => {
  res.status(404).render('pages/404', {
    title: 'Page Not Found - BridgeIn',
  });
};

exports.serverError = (req, res) => {
  res.status(500).render('pages/500', {
    title: 'Server Error - BridgeIn',
  });
};