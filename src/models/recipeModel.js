const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
	},
	description: {
		type: String,
		required: true,
	},
	difficulty: {
		type: Number,
		required: true,
	},
	tags: [
		{
		type: String,
		required: true,
		},
	],
	servings: {
		type: Number,
		required: true,
	},
	estimatedTime: {
		type: String,
		required: true,
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
			name: {
				type: String,
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
		required: true,
	},
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
