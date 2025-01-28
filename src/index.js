const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Логирование запросов
app.use((req, res, next) => {
    console.log(`Запрос: ${req.method} ${req.url}`);
    next();
});

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Маршрут проверки сервера
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Сервер работает</title>
        </head>
        <body>
            <h1>Сервер успешно работает!</h1>
            <p>API доступно по маршрутам:</p>
            <ul>
                <li>/api/auth</li>
                <li>/api/menu</li>
                <li>/api/orders</li>
            </ul>
        </body>
        </html>
    `);
});

// Подключение к MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB подключена'))
    .catch((error) => console.error(`Ошибка подключения к MongoDB: ${error.message}`));

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен на http://91.107.120.255:${PORT}`);
});
