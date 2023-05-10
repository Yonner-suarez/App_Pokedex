const { Pokemon, Type } = require("../db");
const axios = require("axios");

require("dotenv").config();

const { URL_BASE } = process.env;

const getByName = async (name) => {
  const nameToLOwerCase = name.toLowerCase();

  try {
    const db = await Pokemon.findOne({
      where: {
        name: nameToLOwerCase,
      },
      include: Type,
      through: {
        attributes: [],
      },
    });

    if (db) {
      const pok = {
        id: db.id,
        name: db.name,
        image: db.image,
        vida: db.vida,
        ataque: db.ataque,
        defensa: db.defensa,
        velocidad: db.velocidad,
        altura: db.altura,
        peso: db.peso,
        Types: db.Types.map((el) => {
          return { slot: el.slot, name: el.name };
        }),
      };
      return [pok];
    } else {
      const resp = await axios.get(`${URL_BASE}/${nameToLOwerCase}`);
      const { data } = resp;
      const pokemonName = [
        {
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"]["front_default"],
          vida: data.stats[0]?.base_stat,
          ataque: data.stats[1]?.base_stat,
          defensa: data.stats[2]?.base_stat,
          velocidad: data.base_experience,
          altura: data.height,
          peso: data.weight,
          Types: data.types.map((ele) => {
            return {
              slot: ele.slot,
              name: ele.type.name,
            };
          }),
        },
      ];
      return pokemonName;
    }
  } catch (error) {
    return [];
  }
};

module.exports = getByName;
