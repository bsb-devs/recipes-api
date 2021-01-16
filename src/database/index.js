require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@recipescluster.m9dnr.mongodb.net/recipes?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
