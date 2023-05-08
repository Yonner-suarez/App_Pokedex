//este controller tiene la responsabilidad de traer un usuario de la bdd

const { User } = require("../db");

const getUsers = async (userName, password) => {
  try {
    // a traves del metodo finOne que busca una sola coincidencia se busca al usuario donde el userName y la password correspondan
    const user = await User.findOne({
      where: { userName: userName, password: password },
      attributes: ["id", "userName", "password"],
    });

    // si el usuario existe se retorna un obj con el usuario y la prop access en true
    if (user) {
      return { user, access: true };
    } else {
      //si no existe tal usuario se retorna un obj con la prop accesses en false
      return { access: false };
    }
  } catch (error) {
    //si hay algun error se retorna el error
    return error;
  }
};
module.exports = getUsers;
