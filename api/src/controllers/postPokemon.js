const { Pokemon, Type } = require("../db");

const postPokemon = async ({
  name,
  image,
  vida,
  ataque,
  defensa,
  velocidad,
  altura,
  peso,
  tipo,
}) => {
  try {
    const busca = await Pokemon.findOne({ where: { name: name } });
    if (busca) return { message: "El Pokemon ya existe" };

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

      for (const name of tipo) {
        const buscaNamesType = await Type.findOne({ where: { name: name } });
        await newPokemon.addTypes(buscaNamesType.slot);
      }
      return { message: "Pokemon creado exitosamente" };
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = postPokemon;
