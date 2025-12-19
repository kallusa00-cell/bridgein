/**
 * Subscription Model
 * Represents a student subscription (Plus tier)
 */

class Subscription {
  constructor(data) {
    this.userId = data.userId;
    this.email = data.email;
    this.name = data.name;
    this.plan = data.plan || 'plus';
    this.status = data.status || 'active';
    this.amount = data.amount || 2000; // $20.00 in cents
    this.currency = 'CAD';
    this.stripeCustomerId = data.stripeCustomerId || null;
    this.stripeSubscriptionId = data.stripeSubscriptionId || null;
    this.currentPeriodStart = data.currentPeriodStart || new Date();
    this.currentPeriodEnd = data.currentPeriodEnd || this.calculateNextBillingDate();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  calculateNextBillingDate() {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  }

  isActive() {
    return this.status === 'active' && new Date() < this.currentPeriodEnd;
  }

  cancel() {
    this.status = 'cancelled';
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      userId: this.userId,
      email: this.email,
      name: this.name,
      plan: this.plan,
      status: this.status,
      amount: this.amount,
      currency: this.currency,
      currentPeriodStart: this.currentPeriodStart,
      currentPeriodEnd: this.currentPeriodEnd,
      isActive: this.isActive(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static async create(data) {
    const subscription = new Subscription(data);
    // TODO: Create Stripe subscription
    // TODO: Save to database
    return subscription;
  }
}

module.exports = Subscription;
