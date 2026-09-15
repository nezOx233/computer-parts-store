const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./backend/store.db', (err) => {
    if (err) {
        console.error('Помилка підключення до БД:', err.message);
    } else {
        console.log('База даних SQLite підключена.');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    db.get('SELECT COUNT(*) AS count FROM items', (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }

        if (row.count === 0) {
            const products = [
                'Intel Core i5-12400F',
                'AMD Ryzen 5 5600',
                'NVIDIA GeForce RTX 4060',
                'Kingston Fury 16GB DDR4',
                'Samsung 980 1TB NVMe',
                'ASUS PRIME B660M-A',
                'be quiet! System Power 10 650W',
                'Western Digital Blue 1TB'
            ];

            const statement = db.prepare(
                'INSERT INTO items (name) VALUES (?)'
            );

            products.forEach((product) => {
                statement.run(product);
            });

            statement.finalize();

            console.log('Тестові товари додані до БД.');
        }
    });
});

module.exports = db;    