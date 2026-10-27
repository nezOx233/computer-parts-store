// Users: початкова модель покупця, без авторизації та паролів.
class User {
  constructor({ id, displayName, email }) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Некоректний id користувача');
    }
    if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Некоректний email');
    }
    this.id = id;
    this.email = email;
    this.changeDisplayName(displayName);
  }

  changeDisplayName(name) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error("Ім'я користувача не може бути порожнім");
    }
    this.displayName = name.trim();
  }
}

module.exports = User;
