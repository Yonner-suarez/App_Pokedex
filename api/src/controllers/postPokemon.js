const { Pokemon, Type } = require("../db");

const postPokemon = async (req, res) => {
  const { name, image, vida, ataque, defensa, velocidad, altura, peso, tipo } =
    req.body;

  if (![name, image, vida, ataque, defensa].every(Boolean)) {
    res.status(400).json({ Error: "Faltan datos" });
  }

  const busca = await Pokemon.findOne({ where: { name: name } });
  if (busca) res.status(200).json({ message: "El Pokemon ya existe" });

  if (!busca) {
    const newPokemon = await Pokemon.create({
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

    res.status(200).json({ message: "Pokemon creado exitosamente" });
    console.log(newPokemon);
    await newPokemon.addTypes(tipo);
  }
};

module.exports = postPokemon;
