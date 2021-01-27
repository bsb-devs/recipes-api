const express = require('express');

const Ingredients = require('../models/ingredientModel');
const Recipe = require('../models/recipeModel');

const IngredientControler = express.Router();



IngredientControler.post('/register', async(req, res)=>{
    const { ingredient } = req.body;
    try{  
        const ing = await Ingredients.findOne({ingredient});
        if(ing)
            return res.status(200).send(ing);
        const newIngredient = await Ingredients.create(req.body);   
        return res.status(201).send(ingredient)

        
    } catch(err) {
        return res.status(400).send({ error: `${err}`})
    }
});


Ingredientconstroller.get('/findAll', async (req, res) => {
    try{
        const ingredients = await Ingredients.find()

        return res.status(200).send(ingredients)
    }
    catch(err){
        return res.status(400).send({error: `${err}` })
    }
});

Ingredientconstroller.get('/findById', async (req, res) => {
    try{
        const ingredients = await Ingredients.findById(req.params.IngredientId).populate([
            { path: 'recipes'},
        ]);

        return res.status(200).send(ingredients)
    }
    catch(err){
        return res.status(400).send({error: `${err}` })
    }
});

Ingredientconstroller.delete('/delete/:ingredientId', async (req, res) => {
    try{
        const ingredients = await Ingredients.findByIdAndDelete(req.params.userId);

        return res.status(200).send(ingredients._id)
    }
    catch(err){
        return res.status(400).send({error: `${err}` })
    }
});


Ingredientconstroller.put('/update/:ingredientId', async (req, res) => {
    try{
        
        const ingredients = req.params.IngredientId
        const update = req.body
        const updateIngrredient = await Ingredients.findByIdAndUpdate(
            ingredients,
            update,
            {
                new: true,
                useFindAndModify: true,
            }
        );


        return res.status(200).send(updateRecipe)
    }
    catch(err){
        return res.status(400).send({error: `${err}` })
    }
});

// IngredientControler.post('/register/:recipeId', async(req, res)=>{
//     try{
//         const recipe = await Recipe.findById(req.params.recipeId);  //procura a receita por id
//         const ingredient = await Ingredients.create(req.body);      //criou um ingrediente
//         ingredient.recipes.push(recipe);                            //procura a receita por id
//         await ingredient.save();
        
//     }
//     catch(err){

//     }
// })

module.exports = app => app.use('/ingredient', IngredientControler);