//controller con la responsabilidad de buscar en la bdd todos los usuario registrados y guardados

const { User } = require("../db");

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    if (users) {
      //si hay usuarios retorno los usuarios
      return users;
    }
    // caso contrario arrojo un error con el mensaje 'no hay usuarios'
    throw Error("No users");
  } catch (error) {
    //si ocurre un error en el proceso returno el error
    return error;
  }
};
module.exports = getAllUsers;
