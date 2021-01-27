const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		require: true,
		select: false,
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
UserSchema.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;