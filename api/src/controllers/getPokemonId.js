const axios = require("axios");
const { Pokemon, Type } = require("../db");
require("dotenv").config();

const { URL } = process.env;

const getPokemonsId = async (req, res) => {
  const { idPokemon } = req.params;

  if (idPokemon % 1 === 0) {
    try {
      const pokemonId = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
      );
      const newObj = pokemonId.data.types.map((ele) => {
        return {
          slot: ele.slot,
          name: ele.type.name,
        };
      });

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
        Types: newObj,
      };
      res.status(200).json([pok]);
    } catch (error) {
      res.status(404).json({ err: error.message });
    }
  } else {
    try {
      const pokemon = await Pokemon.findByPk(idPokemon, {
        include: {
          model: Type,
          through: {
            attributes: [],
          },
        },
      });
      return res.status(200).json([pokemon.dataValues]);
    } catch (error) {
      res.status(404).json({ err: error.message });
    }
  }
};

module.exports = getPokemonsId;
