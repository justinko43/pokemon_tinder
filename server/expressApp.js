const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// add route
const app = express();

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('\nConnected with database');
});

// Allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// parse request body and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('build'));

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
