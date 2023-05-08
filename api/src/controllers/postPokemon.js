//este controller tiene la responsabilidad de crear un pokemon en la bdd y relacionarlo

const { Pokemon, Type, User } = require("../db");
//traigo los modelos o tablas de la bdd

const postPokemon = async (
  { name, image, vida, ataque, defensa, velocidad, altura, peso, tipo },
  userName,
  password
) => {
  name = name.toLowerCase();
  //verifico e ingreso el nombre en minusculas para poder buscar de manera mas eficiente en otros controladores

  try {
    //treto de buscar si el pokemon que intentan ingresar ya existe
    const busca = await Pokemon.findOne({ where: { name: name } });
    //si ya existe retu¿orno n mensaje 'el pokemon ya existe'
    if (busca) return { message: "Pokemon already exists" };

    if (!busca) {
      //si no existe con el metodo create creo el pokemon con toda la info que me envian por parametros
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

      //como lo que el controllesr espera en tipo es un array con los nombres a los que se quiere relacionar el pokemon se recorre ese array y se busca en el modelo Type donde es nombre coincida, ademas se busca el usuario que coincida con el userName y la password
      for (const name of tipo) {
        const buscaNamesType = await Type.findOne({ where: { name: name } });
        const buscaUser = await User.findOne({
          where: { userName: userName, password: password },
        });
        //asi se podra relacionar el nuevo pokemon añadiendo los tipos y el usuario al que ira a pertenecer
        await newPokemon.setUser(buscaUser.id);
        await newPokemon.addTypes(buscaNamesType.slot);
      }
      //luego de crear el pokemon retorno el mensaje "Pokemon creado exitosamente"
      return { message: "Pokemon successfully created" };
    }
  } catch (error) {
    //si hay algun error se retorna el error
    return error;
  }
};

module.exports = postPokemon;
