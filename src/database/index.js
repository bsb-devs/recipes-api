const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://dev:dev12345@recipescluster.m9dnr.mongodb.net/recipes?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
