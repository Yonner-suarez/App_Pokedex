const axios = require("axios");
const { Pokemon, Type } = require("../db");
require("dotenv").config();

const { URL } = process.env;

const allPok = [];
const getPokemons = (req, res) => {
  const { name } = req.query;

  if (!name) {
    let urls;
    let fullPok;
    let pok;
    axios
      .get(`${URL}?limit=10`)
      .then((res) => {
        urls = res.data.results.map((dat) => dat.url);
        return urls;
      })
      .then((resp) => {
        axios.all(resp.map((url) => axios.get(url))).then(async (respuesta) => {
          let aux = respuesta.map((data) => data);
          const newAux = aux.map((obj) => {
            pok = {
              id: obj.data.id,
              name: obj.data.name,
              image: obj.data.sprites.other.dream_world.front_default,
              vida: obj.data.stats[0]?.base_stat,
              ataque: obj.data.stats[1]?.base_stat,
              defensa: obj.data.stats[2]?.base_stat,
              velocidad: obj.data.base_experience,
              altura: obj.data.height,
              peso: obj.data.weight,
              tipo: obj.data.types[0]?.type.name,
            };
            return pok;
          });
          console.log(newAux);

          const dbPok = await Pokemon.findAll({
            include: {
              model: Type,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          });

          fullPok = [...dbPok, ...newAux];
          res.status(200).json(fullPok);
          //await Pokemon.bulkCreate(allPok);
        });
      })
      .catch((error) => {
        res.status(404).json({ error: error.message });
      });
  } else {
    const nameToLOwerCase = name.toLowerCase();

    axios
      .get(`${URL}/${nameToLOwerCase}`)
      .then((resp) => {
        const pokemonName = {
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
        };

        res.status(200).json(pokemonName);
      })
      .catch((err) => {
        res.status(404).json({ error: err.message });
      });
  }
};
module.exports = getPokemons;

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
