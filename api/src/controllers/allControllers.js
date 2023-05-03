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
