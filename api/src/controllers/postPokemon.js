const { Pokemon, Type, User } = require("../db");

const postPokemon = async (
  { name, image, vida, ataque, defensa, velocidad, altura, peso, tipo },
  userName,
  password
) => {
  name = name.toLowerCase();

  try {
    const busca = await Pokemon.findOne({ where: { name: name } });
    if (busca) return { message: "Pokemon already exists" };

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
        await newPokemon.setUser(buscaUser.id);
        await newPokemon.addTypes(buscaNamesType.slot);
      }
      return { message: "Pokemon successfully created" };
    }
  } catch (error) {
    return error;
  }
};

module.exports = postPokemon;
