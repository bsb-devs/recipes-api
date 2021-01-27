const mongoose = require('mongoose');

const IngredientsSchema = new mogoose.Schema({
    name: {
        type: String,
        require: true,
    },
    recipes: [
		{
			type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
            select: true,
		},
	],
    
})

const Ingredients = mongoose.model('Ingredients', IngredientsSchema);

module.exports = Ingredients;