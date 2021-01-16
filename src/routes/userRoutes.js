const express = require('express');
const userController = require('../controllers/userController');

const userRoutes = new express.Router();

userRoutes.get('/test', userController.test);

userRoutes.post('/login', AuthController.login);


module.exports = userRoutes;