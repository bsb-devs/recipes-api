const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	recipes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Recipe',
		},
	],
	favoriteRecipes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Recipe',
		},
	],
	recipesHistory: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Recipe',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;