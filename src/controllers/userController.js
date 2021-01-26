require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const auth = require('../middlewares/auth');

const AuthController = express.Router();
//Auth
function generateToken( id ) {
  return jwt.sign({id}, process.env.secret);
};

AuthController.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.findOne({ email }).select('+password'); 
    if(!user)
      return res.status(400).send({ message: `${email} does not exists` });
    if(!await bcrypt.compare(password, user.password))
      return res.status(400).send({ message: `Wrong password` });
    
    user.password = undefined;
    const token = await generateToken(user.id);
    const authtoken = `Bearer ${token}`;

    return res.status(200).header('authtoken', authtoken).send({ user });  
  } catch(err) {
    return res.status(400).send({ error: `Login failed ${err}` })
  }
});

AuthController.get('/logged', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate([
      { path: 'recipes' },
    ]); //Pegando Id da receita da url
    
    return res.status(200).send(user)
  } catch(err) {
    return res.status(400).send({ error: `${err}` })
  }
});

AuthController.post('/register',  async (req, res) => {
  const { email }  = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ message: `${email} already exists` });
    const user = await User.create(req.body)
    user.password = undefined;
    const token = await generateToken(user.id);
    const authtoken = `Bearer ${token}`;

    return res.status(201).header('authtoken', authtoken).send({ user });  
  } catch(err) {
    return res.status(400).send({ error: `Registration failed ${err}` })
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
