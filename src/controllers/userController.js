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

AuthController.get('/findById/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate([
      { path: 'recipes' },
    ]); //Pegando Id da receita da url
    
    return res.status(200).send(user)
  } catch(err) {
    return res.status(400).send({ error: `${err}` })
  }
});

AuthController.get('/findAll', async (req, res) => {
  try {
    const users = await User.find(); //Pegando Id da receita da url
    
    return res.status(200).send(users)
  } catch(err) {
    return res.status(400).send({ error: `${err}` })
  }
});

AuthController.delete('/delete/:userId', async (req, res) => {
  try {
    const users = await User.findOneAndDelete(req.params.userId); //Pegando Id da receita da url
    
    return res.status(200).send({ message: `this user was deleted : ${users._id}`})
  } catch(err) {
    return res.status(400).send({ error: `${err}` })
  }
});


AuthController.put('/update/:userId', async (req, res) => {
  try {
    const user = req.params.userId
    const update = req.body
    const updatedUser = await User.findByIdAndUpdate(
      user, 
      update, 
      { 
        new: true,
        useFindAndModify: true, 
      }
    );
    
    return res.status(200).send(updatedUser)
  } catch(err) {
    return res.status(400).send({ error: `${err}` })
  }
});


module.exports = app => app.use('/user', AuthController);
