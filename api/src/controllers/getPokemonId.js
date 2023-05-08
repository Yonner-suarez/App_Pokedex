//este controller tendra como resposabilidad buscar un pokemon especifico por medio de un identificador

const axios = require("axios");

const { Pokemon, Type } = require("../db");
require("dotenv").config();

const { URL_BASE } = process.env;

const getPokemonsId = async (idPokemon) => {
  if (!isNaN(idPokemon)) {
    // si el id recibido por parametro correspe a un numero entero procede hacer la busqueda desde la API
    try {
      const pokemonId = await axios.get(`${URL_BASE}/${idPokemon}`);
      //con la data que me da la respuesta armo un objeto con el id y el tipo del pokemon a buscar
      const newObj = pokemonId.data.types.map((ele) => {
        return {
          slot: ele.slot,
          name: ele.type.name,
        };
      });
      //teniendo el tipo/s del pokemon creo el objeto con la informacion necesaria para responder al cliente incluye el array co sus tipos
      const pok = {
        id: pokemonId.data.id,
        name: pokemonId.data.name,
        image:
          pokemonId.data.sprites.other["official-artwork"]["front_default"],
        vida: pokemonId.data.stats[0]?.base_stat,
        ataque: pokemonId.data.stats[1]?.base_stat,
        defensa: pokemonId.data.stats[2]?.base_stat,
        velocidad: pokemonId.data.base_experience,
        altura: pokemonId.data.height,
        peso: pokemonId.data.weight,
        Types: newObj,
      };
      //al igual que la busqueda pro nombre retorno en forma de array el obj buscado
      return [pok];
    } catch (error) {
      //si en la pedida de ocurre algun error lo arrojo para que la ruta mande la respuesta correspondiente
      throw Error(error);
    }
  } else {
    //ahora si el tipo de id que recibe la funcion no es un numero ('Recordar que es un tipo de UUID') hace la respectiva busqueda en la bdd con el metodo findByPk, incluyendo el modelo de Type para el poñemon buscado
    try {
      const pokemon = await Pokemon.findByPk(idPokemon, {
        include: {
          model: Type,
          through: {
            attributes: [],
          },
        },
      });
      return [pokemon];
    } catch (error) {
      throw Error(error);
    }
  }
};

module.exports = getPokemonsId;
