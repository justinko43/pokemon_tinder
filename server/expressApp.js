const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pokemons = require('./routes/api');
const images = require('./routes/images');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.connection.once('open', () => {
  console.log('\nConnected with database');
});

// Allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// parse request body and cookies
app.use(bodyParser.json({ limit: '4MB' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('build'));

// our routes
app.use('/pokemons', pokemons);
app.use('/images', images);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  console.error(err);
});

module.exports = app;
