const axios = require("axios");
const { Pokemon } = require("../db");
require("dotenv").config();

const { URL } = process.env;

const getPokemonsId = async (req, res) => {
  const { idPokemon } = req.params;

  try {
    const pokemonId = await axios.get(`${URL}/${idPokemon}`);
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
    const pokemon = await Pokemon.findByPk(idPokemon);
    console.log(pokemon);
    if (pokemon !== null) {
      return res.status(200).json(pokemon);
    }
    res.status(200).json(pok);
  } catch (error) {
    res.status(404).json({ err: error });
  }
};

module.exports = getPokemonsId;
