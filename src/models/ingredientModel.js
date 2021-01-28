const mongoose = require('mongoose');

const IngredientsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
})

const Ingredients = mongoose.model('Ingredients', IngredientsSchema);

module.exports = Ingredients;