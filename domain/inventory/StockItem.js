// Inventory сам контролює правило: зарезервувати більше, ніж є, не можна.
class StockItem {
  constructor({ productId, onHand, reserved = 0 }) {
    if (!Number.isInteger(productId) || productId <= 0) {
      throw new Error('Некоректний productId');
    }
    if (!Number.isInteger(onHand) || onHand < 0 ||
        !Number.isInteger(reserved) || reserved < 0 || reserved > onHand) {
      throw new Error('Некоректні залишки');
    }
    this.productId = productId;
    this.onHand = onHand;
    this.reserved = reserved;
  }

  get available() {
    return this.onHand - this.reserved;
  }

  reserve(quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Кількість резерву має бути додатною');
    }
    if (quantity > this.available) {
      throw new Error('Недостатньо товару на складі');
    }
    this.reserved += quantity;
  }

  release(quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0 || quantity > this.reserved) {
      throw new Error('Некоректна кількість для зняття резерву');
    }
    this.reserved -= quantity;
  }
}

module.exports = StockItem;
