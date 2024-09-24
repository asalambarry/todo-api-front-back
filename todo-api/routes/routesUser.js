const express = require('express');
const router = express.Router();

// Importation des contrôleurs
const { register, login } = require('../controllers/UserController');

// Routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
