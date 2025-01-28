const express = require('express');
const MenuItem = require('../models/MenuItem');
const authorize = require('../middleware/authorize');
const roleCheck = require('../middleware/roleCheck');
const router = express.Router();

// Создание блюда (admin, editor)
router.post('/', authorize, roleCheck(['admin', 'editor']), async (req, res) => {
    const { name, description, price, category, allergens, isAvailable } = req.body;

    try {
        const newMenuItem = new MenuItem({ name, description, price, category, allergens, isAvailable });
        const savedMenuItem = await newMenuItem.save();
        res.status(201).json({ message: 'Блюдо успешно добавлено', menuItem: savedMenuItem });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка создания блюда', error: error.message });
    }
});

// Получение всех блюд
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка получения меню', error: error.message });
    }
});

module.exports = router;
