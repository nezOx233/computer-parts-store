// Catalog: товар як бізнес-сутність (поки не підключений до SQLite).
class Product {
  constructor({ id, name, category = 'Без категорії' }) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Product id має бути додатним цілим числом');
    }
    this.id = id;
    this.rename(name);
    this.category = category;
  }

  rename(name) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error('Назва товару не може бути порожньою');
    }
    this.name = name.trim();
  }
}

module.exports = Product;
