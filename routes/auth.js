const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST - LOGIN
router.post('/login', authController.auth_login);

// POST - LOGOUT
router.post('/logout', authController.auth_logout);

module.exports = router;