const { User } = require("../db");

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    if (users) {
      return users;
    }
    throw Error("No users");
  } catch (error) {
    return error;
  }
};
module.exports = getAllUsers;
