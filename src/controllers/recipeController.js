const express = require('express');

const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const auth = require('../middlewares/auth');

const RecipeController = express.Router();

RecipeController.post('/register', auth, async (req, res) => {
    try {
      const user = await User.findById(req.userId); //Pegando Id do usuario da url
			const recipe = await Recipe.create({
        ...req.body,
        user : user, 
      })
      await recipe.save();                //Salvando a receita criada                                      
      user.recipes.push(recipe);          //Adicionando a receita no array do usuario  
      await user.save();                  //Salvando o usuario antes de devolver a receita
			
			return res.status(201).send(recipe)
    } catch(err) {
      return res.status(400).send({ error: `${err}` })
    }
});

RecipeController.get('/findById/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate([
      { path: 'user' },
    ]); //Pegando Id da receita da url
    
    return res.status(200).send(recipe)
  } catch(err) {
    return res.status(400).send({ error: `${err}` })
  }
});

RecipeController.get('/findAll', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate([
      { path: 'user' },
    ]); //Pegando Id da receita da url
    
    return res.status(200).send(recipes)
  } catch(err) {
    return res.status(400).send({ error: `${err}` })
  }
});

RecipeController.delete('/delete/:recipeId', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId); //Pegando Id da receita da url
    
    return res.status(200).send(recipe._id)
  } catch(err) {
    return res.status(400).send({ error: `${err}` })
  }
});

RecipeController.put('/update/:recipeId', auth, async (req, res) => {
  try {
    const recipe = req.params.recipeId
    const update = req.body
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipe, 
      update, 
      { 
        new: true,
        useFindAndModify: true, 
      }
    );
    
    return res.status(200).send(updatedRecipe)
  } catch(err) {
    return res.status(400).send({ error: `${err}` })
  }
});


module.exports = app => app.use('/recipe', RecipeController);
