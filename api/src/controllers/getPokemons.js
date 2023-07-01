const axios = require("axios");
const { Pokemon, Type, User } = require("../db");

require("dotenv").config();

const { URL_BASE } = process.env;

let cachePokemons = null;

const getPokemonsApi = async () => {
  if (cachePokemons) {
    return cachePokemons;
  }

  let fullPok = [];
  let pok;

  let nextUrl = `${URL_BASE}?limit=100`;

  while (nextUrl) {
    try {
      const resp = await axios.get(nextUrl);

      const { results, next } = resp.data;

      const urls = results.map((result) => result.url);

      const respuesta = await axios.all(
        urls.map(async (url) => await axios.get(url))
      );

      const data = respuesta.map((info) => info.data);

      const info = data.map((personaje) => {
        const newObj = personaje.types.map((ele) => {
          return {
            slot: ele.slot,
            name: ele.type.name,
          };
        });
        pok = {
          id: personaje.id,
          name: personaje.name,
          image: personaje.sprites.other["official-artwork"]["front_default"],
          vida: personaje.stats[0]?.base_stat,
          ataque: personaje.stats[1]?.base_stat,
          defensa: personaje.stats[2]?.base_stat,
          velocidad: personaje.base_experience,
          altura: personaje.height,
          peso: personaje.weight,
          Types: newObj,
        };
        return pok;
      });

      fullPok.push(...info);
      cachePokemons = fullPok;

      nextUrl = next;
    } catch (error) {
      nextUrl = null;
      return error;
    }
  }
  return fullPok;
};

const getPokemonsByBdd = async (id) => {
  try {
    if (id) {
      const buscaUser = await User.findOne({
        where: { id: id },
      });

      if (buscaUser) {
        const dbPok = await Pokemon.findAll({
          where: { UserId: buscaUser.id },
          include: {
            model: Type,
            through: {
              attributes: [],
            },
          },
        });

        if (dbPok.length === 0) return [];

        return dbPok;
      }

      return [];
    }
    return [];
  } catch (error) {
    return error;
  }
};

const getPokemons = async (id) => {
  try {
    const poke = await getPokemonsApi();
    const pokBdd = await getPokemonsByBdd(id);

    if (pokBdd.length === 0) {
      const soloApi = [...poke];
      return soloApi;
    }

    const allpoks = [...pokBdd, ...poke];
    return allpoks;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getPokemons,
  cachePokemons,
};

//   .then((res) => {
//         promises = res.map((url) => axios.get(url));
//         return promises;
//       })
//       .then((promisesP) => {
//         Promise.all(promisesP).then((resp) => {
//           resp.forEach((resp) => {
//             allPok.push({
//               id: resp.data.id,
//               name: resp.data.name,
//               image: resp.data.sprites.other.dream_world.front_default,
//               vida: resp.data.stats[0]?.base_stat,
//               ataque: resp.data.stats[1]?.base_stat,
//               defensa: resp.data.stats[2]?.base_stat,
//               velocidad: resp.data.base_experience,
//               altura: resp.data.height,
//               peso: resp.data.weight,
//               tipo: resp.data.types[0]?.type.name,
//             });
//           });
//           res.status(200).json(allPok);
//       });
//       })
//! con promise.all()
