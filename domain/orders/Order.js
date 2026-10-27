const OrderItem = require('./OrderItem');

// Orders: містить лише бізнес-правила, не пише в БД і не викликає API.
class Order {
  constructor({ id, userId }) {
    if (!Number.isInteger(id) || id <= 0 || !Number.isInteger(userId) || userId <= 0) {
      throw new Error('Некоректний id замовлення або покупця');
    }
    this.id = id;
    this.userId = userId;
    this.items = [];
    this.status = 'draft';
  }

  addItem(item) {
    if (this.status !== 'draft') throw new Error('Замовлення вже оформлене');
    if (!(item instanceof OrderItem)) throw new Error('Очікується OrderItem');
    this.items.push(item);
  }

  get totalKopecks() {
    const sum = this.items.reduce((total, item) => total + item.subtotalKopecks, 0);
    if (!Number.isSafeInteger(sum)) throw new Error('Сума завелика');
    return sum;
  }

  place() {
    if (this.status !== 'draft' || this.items.length === 0) {
      throw new Error('Не можна оформити порожнє або вже оформлене замовлення');
    }
    this.status = 'placed';
  }

  markPaid() {
    if (this.status !== 'placed') throw new Error('Оплата можлива тільки для оформленого замовлення');
    this.status = 'paid';
  }

  cancel() {
    if (!['draft', 'placed'].includes(this.status)) {
      throw new Error('Замовлення у цьому статусі не можна скасувати');
    }
    this.status = 'cancelled';
  }
}

module.exports = Order;
