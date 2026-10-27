// Payments: навчальна модель відомого результату, без реального провайдера.
class Payment {
  constructor({ id, orderId, amountKopecks }) {
    if (!Number.isInteger(id) || id <= 0 || !Number.isInteger(orderId) || orderId <= 0) {
      throw new Error('Некоректний id платежу або замовлення');
    }
    if (!Number.isSafeInteger(amountKopecks) || amountKopecks < 0) {
      throw new Error('Некоректна сума платежу');
    }
    this.id = id;
    this.orderId = orderId;
    this.amountKopecks = amountKopecks;
    this.status = 'pending';
  }

  confirm() {
    if (this.status !== 'pending') throw new Error('Платіж уже завершено');
    this.status = 'paid';
  }

  fail() {
    if (this.status !== 'pending') throw new Error('Платіж уже завершено');
    this.status = 'failed';
  }
}

module.exports = Payment;
