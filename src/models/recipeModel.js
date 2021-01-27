const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	photo: {
		type: String,
	},
	description: {
		type: String,
		require: true,
	},
	difficulty: {
		type: Number,
		require: true,
	},
	tags: [
		{
		type: String,
		require: true,
		},
	],
	servings: {
		type: Number,
		require: true,
	},
	estimatedTime: {
		type: String,
		require: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	ingredients: [
		{
			ingredient: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Ingredients',
				require: true,
			},
			qty: {
				type: String,
				require: true,
			}
		},
	],
	directions: {
		type: String,
		require: true,
	},
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
