const express = require('express');
const Order = require('../models/Order');
const authorize = require('../middleware/authorize');
const router = express.Router();

// Создание заказа
router.post('/', authorize, async (req, res) => {
    const { customerName, items, totalAmount } = req.body;

    try {
        const newOrder = new Order({ customerName, items, totalAmount });
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Заказ успешно создан', order: savedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка создания заказа', error: error.message });
    }
});

// Получение всех заказов
router.get('/', authorize, async (req, res) => {
    try {
        const orders = await Order.find().populate('items.menuItem');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка получения заказов', error: error.message });
    }
});

module.exports = router;
