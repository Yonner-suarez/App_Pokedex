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
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      image,
    });

    res.status(200).json({ message: "Pokemon creado exitosamente" });

    for (const name of tipo) {
      const buscaNamesType = await Type.findOne({ where: { name: name } });
      await newPokemon.addTypes(buscaNamesType.slot);
    }
  }
};

module.exports = postPokemon;
