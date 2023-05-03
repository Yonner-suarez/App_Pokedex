const { Pokemon, Type, User } = require("../db");

const postPokemon = async (
  { name, image, vida, ataque, defensa, velocidad, altura, peso, tipo },
  userName,
  password
) => {
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
        const buscaUser = await User.findOne({
          where: { userName: userName, password: password },
        });
        console.log(buscaUser.id);
        await newPokemon.setUser(buscaUser.id);
        await newPokemon.addTypes(buscaNamesType.slot);
      }

      console.log(newPokemon);
      return { message: "Pokemon creado exitosamente" };
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = postPokemon;
