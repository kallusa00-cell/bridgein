/**
 * Contact Model
 * Represents an employer contact form submission
 * Ready for database integration (MongoDB, PostgreSQL, etc.)
 */

class Contact {
  constructor(data) {
    this.companyName = data.companyName;
    this.contactName = data.contactName;
    this.email = data.email;
    this.phone = data.phone || null;
    this.companySize = data.companySize;
    this.industry = data.industry;
    this.positions = parseInt(data.positions) || 1;
    this.timeline = data.timeline;
    this.message = data.message || null;
    this.diversityHiring = data.diversityHiring || false;
    this.status = 'new';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  validate() {
    const errors = [];

    if (!this.companyName || this.companyName.trim().length < 2) {
      errors.push('Company name is required');
    }

    if (!this.contactName || this.contactName.trim().length < 2) {
      errors.push('Contact name is required');
    }

    if (!this.email || !this.email.includes('@')) {
      errors.push('Valid email is required');
    }

    if (!this.companySize) {
      errors.push('Company size is required');
    }

    if (!this.industry) {
      errors.push('Industry is required');
    }

    return errors;
  }

  toJSON() {
    return {
      companyName: this.companyName,
      contactName: this.contactName,
      email: this.email,
      phone: this.phone,
      companySize: this.companySize,
      industry: this.industry,
      positions: this.positions,
      timeline: this.timeline,
      message: this.message,
      diversityHiring: this.diversityHiring,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Static methods for future database integration
  static async create(data) {
    const contact = new Contact(data);
    const errors = contact.validate();
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    // TODO: Save to database
    return contact;
  }

  static async findById(id) {
    // TODO: Fetch from database
    return null;
  }

  static async findAll(filters = {}) {
    // TODO: Fetch from database with filters
    return [];
  }
}

module.exports = Contact;
