const mongoose = require('mongoose');

const { Schema } = mongoose;

const pokemonSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  factoid: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
