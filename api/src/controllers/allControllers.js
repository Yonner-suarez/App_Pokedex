//este handler o controller tiene la funcionalidad de requerir todos los controller´s que tienen la responsabilidad de manejar la logica de los datos pedidos en las rutas

const { getPokemons, cachePokemons } = require("./getPokemons");
const getPokemonsId = require("./getPokemonId");
const postPokemon = require("./postPokemon");
const getTypes = require("./getTypes");
const getByName = require("./getByName");
const getUsers = require("./getUsers");
const postUser = require("./postUser");

module.exports = {
  getPokemons,
  getPokemonsId,
  postPokemon,
  getByName,
  getTypes,
  cachePokemons,
  postUser,
  getUsers,
};
