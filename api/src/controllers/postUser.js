const { User } = require("../db");

const postUser = async (userName, password) => {
  try {
    const buscaUser = await User.findOne({ where: { userName: userName } });

    if (buscaUser) return "User already exists";

    await User.create({
      userName,
      password,
    });

    return "You can start your adventure";
  } catch (error) {
    return error;
  }
};
module.exports = postUser;
