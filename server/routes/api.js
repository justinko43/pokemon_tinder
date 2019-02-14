const express = require('express');

const router = express.Router();

const pokemonController = require('../controllers/pokemonController');

router.get('/', pokemonController.getPokemon);

router.post('/', pokemonController.addPokemon);

router.put('/:id', pokemonController.updatePokemon);

router.delete('/:id', pokemonController.deletePokemon);

module.exports = router;
