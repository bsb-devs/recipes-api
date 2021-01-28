require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./src/database/index')

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/controllers/userController')(app);
require('./src/controllers/recipeController')(app);
require('./src/controllers/ingredientController')(app);

app.listen(process.env.PORT || 3001);