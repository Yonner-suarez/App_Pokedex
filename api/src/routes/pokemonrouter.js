const { Router } = require("express");
const {
  getPokemons,
  getPokemonsId,
  postPokemon,
  getByName,
} = require("../controllers/allControllers");

const pokemonRouter = Router();

//?Ruta para obtener AllPokemons o NamePokemon

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
      return res.status(404).json({ error: `pokemon ${name} not found` });
    }
    res.status(200).json(busca);
  }
});

//? Ruta para un pokemon por ID
pokemonRouter.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const getId = await getPokemonsId(idPokemon);
    console.log(getId);
    res.status(200).json(getId);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//?Ruta para agregar un Pokemon a la BDD
pokemonRouter.post("/", async (req, res) => {
  const { name, image, vida, ataque, defensa, velocidad, altura, peso, tipo } =
    req.body;

  if (![name, image, vida, ataque, defensa].every(Boolean)) {
    res.status(400).json({ Error: "Faltan datos" });
  }

  try {
    const agrega = await postPokemon({
      name,
      image,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      tipo,
    });
    res.status(200).json(agrega);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

module.exports = pokemonRouter;
