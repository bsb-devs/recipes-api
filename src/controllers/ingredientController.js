const express = require('express');

const Ingredients = require('../models/ingredientModel');
const Recipe = require('../models/recipeModel');

const IngredientControler = express.Router();



IngredientControler.post('/register', async(req, res)=>{
    const { name } = req.body;
    let lowername = name.toLowerCase(); 
    try{  
        const ing = await Ingredients.findOne({name:lowername});
        if(ing)
            return res.status(200).send(ing);
        const newIngredient = await Ingredients.create({
            ...req.body,
            name: lowername, 
        });   
        return res.status(201).send(newIngredient)

        
    } catch(err) {
        return res.status(400).send({ error: `${err}`})
    }
});


IngredientControler.get('/findAll', async (req, res) => {
    try{
        const ingredients = await Ingredients.find()

        return res.status(200).send(ingredients)
    }
    catch(err){
        return res.status(400).send({error: `${err}` })
    }
});

IngredientControler.get('/findById/:IngredientId', async (req, res) => {
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

IngredientControler.delete('/delete/:IngredientId', async (req, res) => {
    try{
        const ingredients = await Ingredients.findByIdAndDelete(req.params.IngredientId);

        return res.status(200).send(ingredients._id)
    }
    catch(err){
        return res.status(400).send({error: `${err}` })
    }
});


IngredientControler.put('/update/:IngredientId', async (req, res) => {
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


        return res.status(200).send(updateIngrredient)
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