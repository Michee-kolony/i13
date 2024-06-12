const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/info');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://micheekolony71:1708roosevelt@cluster0.6htgklq.mongodb.net/cluster0',
   { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch(err => console.error('Connexion à MongoDB échouée !', err));
app.use(express.json());
app.use(bodyparser.json());
app.use('/informations', router);
module.exports = app;