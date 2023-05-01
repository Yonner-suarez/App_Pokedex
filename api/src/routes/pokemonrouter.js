const { Router } = require("express");
const {
  getPokemons,
  getPokemonsId,
  postPokemon,
  getByName,
} = require("../controllers/allControllers");

const pokemonRouter = Router();

pokemonRouter.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    const allPok = await getPokemons();

    if (!allPok.length) {
      return res.status(404).json(`Algo salio mal`);
    }
    return res.status(200).json(allPok);
  }

  if (name) {
    const busca = await getByName(name);

    if (!busca.length) {
      return res.status(404).json(`pokemon ${name} not found`);
    }
    res.status(200).json(busca);
  }
});
pokemonRouter.get("/:idPokemon", getPokemonsId);
pokemonRouter.post("/", postPokemon);

module.exports = pokemonRouter;
