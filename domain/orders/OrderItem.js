// Orders: ціна задається цілим числом копійок, а не дробовими гривнями.
class OrderItem {
  constructor({ productId, quantity, unitPriceKopecks }) {
    if (!Number.isInteger(productId) || productId <= 0) {
      throw new Error('Некоректний товар');
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Кількість має бути додатною');
    }
    if (!Number.isSafeInteger(unitPriceKopecks) || unitPriceKopecks < 0) {
      throw new Error('Ціна має бути невід’ємним числом копійок');
    }
    this.productId = productId;
    this.quantity = quantity;
    this.unitPriceKopecks = unitPriceKopecks;
  }

  get subtotalKopecks() {
    const value = this.quantity * this.unitPriceKopecks;
    if (!Number.isSafeInteger(value)) throw new Error('Сума завелика');
    return value;
  }
}

module.exports = OrderItem;
