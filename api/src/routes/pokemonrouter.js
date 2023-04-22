const { Router } = require("express");
const {
  getPokemons,
  getPokemonsId,
  postPokemon,
} = require("../controllers/allControllers");

const pokemonRouter = Router();

pokemonRouter.get("/", getPokemons);
pokemonRouter.get("/:idPokemon", getPokemonsId);
pokemonRouter.post("/", postPokemon);

module.exports = pokemonRouter;
