const { User } = require("../db");

const postUser = async (userName, password) => {
  try {
    const buscaUser = await User.findOne({ where: { userName: userName } });

    if (buscaUser) return "User already exists";

    const createUser = await User.create({
      userName,
      password,
    });

    return "You can start your adventure";
  } catch (error) {
    return error.message;
  }
};
module.exports = postUser;
