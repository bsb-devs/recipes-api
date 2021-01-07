const express = require('express');

const User = require('../models/userModel');

const AuthController = express.Router();

AuthController.post('/register', async (req, res) => {
    try {
			const user = await User.create(req.body)
			
			return res.status(201).send({ user })
    } catch(err) {
      return res.status(400).send({ error: 'Registration failed' })
    }
});



module.exports = app => app.use('/user', AuthController);
