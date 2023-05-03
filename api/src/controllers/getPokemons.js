const axios = require("axios");
const { Pokemon, Type } = require("../db");

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

      const respuesta = await Promise.all(
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
      return error.message;
    }
  }
  return fullPok;
};

const getPokemonsByBdd = async () => {
  try {
    const dbPok = await Pokemon.findAll({
      include: {
        model: Type,
        through: {
          attributes: [],
        },
      },
    });

    if (dbPok.length === 0) return [];

    const busca = dbPok.map((pok) => pok.dataValues);

    return busca;
  } catch (error) {
    console.log(error);
  }
};

const getPokemons = async () => {
  try {
    const poke = await getPokemonsApi();
    const pokBdd = await getPokemonsByBdd();

    if (pokBdd.length === 0) {
      const soloApi = [...poke];
      return soloApi;
    }

    const allpoks = [...pokBdd, ...poke];
    return allpoks;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPokemons,
  cachePokemons,
};

/*

?? id= resp.data.id
!! image= resp.data.sprites.other.dream_world.front_default
* name = resp.data.name
! altura = resp.data.heigth
?tipo = resp.data.types[0].type.name
* peso = resp.data.weigth
!vida= 
! 1OPCION = let vit = resp.data.stats.map((vita) => vita.stat.name);
   ! let vita = resp.data.stats.map((vita) => vita.base_stat);
   ! let vitafull = [vit[0], vita[0]];
! 2OPCION= resp.data.stats[0].base_stat

?ataque= let vit = resp.data.stats.map((vita) => vita.stat.name);
   ? let vita = resp.data.stats.map((vita) => vita.base_stat);
    ?let vitafull = [vit[1], vita[1]];
?2OPCION= resp.data.stats[1].base_stat
*defensa=let vit = resp.data.stats.map((vita) => vita.stat.name);
    *let vita = resp.data.stats.map((vita) => vita.base_stat);
    *let vitafull = [vit[2], vita[2]];
*2OPCION= resp.data.stats[2].base_stat
! velocidad =resp.data.base_experience
*/

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
