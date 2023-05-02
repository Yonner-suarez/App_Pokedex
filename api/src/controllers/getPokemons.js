const axios = require("axios");
const { Pokemon, Type } = require("../db");
require("dotenv").config();

const { URL } = process.env;

let cachePokemons = null;

const getPokemons = async () => {
  if (cachePokemons) {
    return cachePokemons;
  }

  let fullPok = [];
  let pok;

  const res = await axios.get(`${URL}?limit=300`);

  const { results } = res.data;

  const url = results.map((url) => url.url);

  const resp = await axios.all(url.map((url) => axios.get(url)));

  const data = resp.map((info) => info.data);

  const info = data.map((perso) => {
    const newObj = perso.types.map((ele) => {
      return {
        slot: ele.slot,
        name: ele.type.name,
      };
    });
    pok = {
      id: perso.id,
      name: perso.name,
      image: perso.sprites.other.dream_world.front_default,
      vida: perso.stats[0]?.base_stat,
      ataque: perso.stats[1]?.base_stat,
      defensa: perso.stats[2]?.base_stat,
      velocidad: perso.base_experience,
      altura: perso.height,
      peso: perso.weight,
      Types: newObj,
    };

    return pok;
  });

  const dbPok = await Pokemon.findAll({
    include: {
      model: Type,
      through: {
        attributes: [],
      },
    },
  });

  const busca = dbPok.map((pok) => pok.dataValues);

  fullPok.push(...busca, ...info);
  cachePokemons = fullPok;

  return fullPok;
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

/*
  .then((res) => {
        promises = res.map((url) => axios.get(url));
        return promises;
      })
      .then((promisesP) => {
        Promise.all(promisesP).then((resp) => {
          resp.forEach((resp) => {
            allPok.push({
              id: resp.data.id,
              name: resp.data.name,
              image: resp.data.sprites.other.dream_world.front_default,
              vida: resp.data.stats[0]?.base_stat,
              ataque: resp.data.stats[1]?.base_stat,
              defensa: resp.data.stats[2]?.base_stat,
              velocidad: resp.data.base_experience,
              altura: resp.data.height,
              peso: resp.data.weight,
              tipo: resp.data.types[0]?.type.name,
            });
          });
          res.status(200).json(allPok);
      });
      })
!!!! con promise.all()
*/
