const axios = require("axios");
const { Pokemon } = require("../db");
require("dotenv").config();

const { URL } = process.env;

const getPokemonsId = async (req, res) => {
  const { idPokemon } = req.params;

  try {
    const pokemon = await Pokemon.findByPk(idPokemon);
    if (pokemon !== null) {
      const pokemonId = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
      );
      const pok = {
        id: pokemonId.data.id,
        name: pokemonId.data.name,
        image: pokemonId.data.sprites.other.dream_world.front_default,
        vida: pokemonId.data.stats[0]?.base_stat,
        ataque: pokemonId.data.stats[1]?.base_stat,
        defensa: pokemonId.data.stats[2]?.base_stat,
        velocidad: pokemonId.data.base_experience,
        altura: pokemonId.data.height,
        peso: pokemonId.data.weight,
        tipo: pokemonId.data.types,
      };
      res.status(200).json({ res: pok, pokemon });
      console.log(pok);
    } else {
      const pokemonId = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
      );
      const pok = {
        id: pokemonId.data.id,
        name: pokemonId.data.name,
        image: pokemonId.data.sprites.other.dream_world.front_default,
        vida: pokemonId.data.stats[0]?.base_stat,
        ataque: pokemonId.data.stats[1]?.base_stat,
        defensa: pokemonId.data.stats[2]?.base_stat,
        velocidad: pokemonId.data.base_experience,
        altura: pokemonId.data.height,
        peso: pokemonId.data.weight,
        tipo: pokemonId.data.types,
      };

      res.status(200).json(pok);
    }
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
};

module.exports = getPokemonsId;
