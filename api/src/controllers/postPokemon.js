const { Pokemon } = require("../db");

const postPokemon = async (req, res) => {
  const { id, name, image, vida, ataque, defensa, velocidad, altura, peso } =
    req.body;

  if (![id, name, image, vida, ataque, defensa].every(Boolean)) {
    res.status(400).json({ Error: "Faltan datos" });
  }
  const newPokemon = await Pokemon.create({
    id,
    name,
    image,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
  });
  res.status(200).json(newPokemon);
};

module.exports = postPokemon;
