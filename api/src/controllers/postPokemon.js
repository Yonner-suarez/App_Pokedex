const { Pokemon, Type } = require("../db");

const postPokemon = async (req, res) => {
  const { name, image, vida, ataque, defensa, velocidad, altura, peso, type } =
    req.body;

  if (![name, image, vida, ataque, defensa].every(Boolean)) {
    res.status(400).json({ Error: "Faltan datos" });
  }

  const busca = await Pokemon.findOne({ where: { name: name } });
  if (busca) res.status(200).json({ message: "El Pokemon ya existe" });

  const newPokemon = await Pokemon.create({
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
  await newPokemon.addTypes(type);
};

module.exports = postPokemon;
