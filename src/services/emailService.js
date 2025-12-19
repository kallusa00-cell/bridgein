/**
 * Email Service
 * Handles sending emails (placeholder for future implementation)
 */

class EmailService {
  constructor(config = {}) {
    this.config = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      from: process.env.CONTACT_EMAIL || 'contact@bridgein.ca',
      ...config,
    };
  }

  async sendEmail({ to, subject, html, text }) {
    // TODO: Implement with nodemailer or other email service
    console.log('📧 Email sent:', { to, subject });
    return { success: true, messageId: `mock-${Date.now()}` };
  }

  async sendContactNotification(contactData) {
    const subject = `New Employer Inquiry: ${contactData.companyName}`;
    const html = `
      <h2>New Employer Contact Form Submission</h2>
      <p><strong>Company:</strong> ${contactData.companyName}</p>
      <p><strong>Contact:</strong> ${contactData.contactName}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
      <p><strong>Company Size:</strong> ${contactData.companySize}</p>
      <p><strong>Industry:</strong> ${contactData.industry}</p>
      <p><strong>Positions:</strong> ${contactData.positions}</p>
      <p><strong>Timeline:</strong> ${contactData.timeline}</p>
      <p><strong>Diversity Hiring:</strong> ${contactData.diversityHiring ? 'Yes' : 'No'}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message || 'No additional message'}</p>
    `;

    return this.sendEmail({
      to: this.config.from,
      subject,
      html,
      text: html.replace(/<[^>]*>/g, ''),
    });
  }

  async sendWelcomeEmail(userData) {
    const subject = 'Welcome to BridgeIn Plus!';
    const html = `
      <h2>Welcome to BridgeIn Plus, ${userData.name}!</h2>
      <p>Thank you for joining our premium mentorship program.</p>
      <p>Here's what you can expect:</p>
      <ul>
        <li>Access to our expert mentor community</li>
        <li>Priority matching with employers</li>
        <li>Portfolio project guidance</li>
        <li>Mock interview sessions</li>
      </ul>
      <p>Get started by logging into your dashboard.</p>
    `;

    return this.sendEmail({
      to: userData.email,
      subject,
      html,
      text: html.replace(/<[^>]*>/g, ''),
    });
  }
}

module.exports = new EmailService();
