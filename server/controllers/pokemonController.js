const Pokemon = require('../model/pokemonModel');

const pokemonController = {};

pokemonController.addPokemon = async (req, res, next) => {
  const newPokemon = new Pokemon(req.body);

  try {
    await newPokemon.save();
    res.status(201).json(newPokemon);
  } catch (err) {
    next(err);
    res.status(500).send(err);
  }
};

pokemonController.updatePokemon = async (req, res, next) => {
  const {
    name,
    description,
    image,
    factoid,
  } = req.body;

  const { id } = req.params;

  const update = {
    name,
    description,
    image,
    factoid,
  };

  try {
    const result = await Pokemon.findOneAndUpdate({ _id: id }, update);
    res.status(200).json(result);
  } catch (err) {
    next(err);
    res.status(500).send(err);
  }
};

pokemonController.getPokemon = async (req, res, next) => {
  try {
    const pokemons = await Pokemon.find({});
    res.status(200).json(pokemons);
  } catch (err) {
    next(err);
    res.status(500).send(err);
  }
};

pokemonController.deletePokemon = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Pokemon.deleteOne({ _id: id });
    res.status(200).send('Successfully deleted');
  } catch (err) {
    next(err);
    res.status(500).send(err);
  }
};

module.exports = pokemonController;
