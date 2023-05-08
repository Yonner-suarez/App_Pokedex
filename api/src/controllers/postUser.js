//este controller tiene la responsabilidad de crear un usuario en la bdd

const { User } = require("../db");

const postUser = async (userName, password) => {
  //recibira por parametros un userName y una password
  try {
    //buscara en la bdd si el usuario ya existe por medio del metodo finOne
    const buscaUser = await User.findOne({ where: { userName: userName } });

    //si el usuario existe retorno el mensaje "User already exists"
    if (buscaUser) return "User already exists";

    //si la funcion no se corta en en anterior condicional uso el metodo create, pasandolo los paramentros
    await User.create({
      userName,
      password,
    });

    //y retorno el mensaje "You can start your adventure"
    return "You can start your adventure";
  } catch (error) {
    //si hay algun error se retorna el error
    return error;
  }
};
module.exports = postUser;
