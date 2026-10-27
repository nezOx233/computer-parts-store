const express = require('express');
const path = require('path');

const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

// GET /items
app.get('/items', (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            console.error(err.message);

            return res.status(500).json({
                error: 'Помилка отримання товарів'
            });
        }

        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});