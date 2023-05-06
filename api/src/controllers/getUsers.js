const { User } = require("../db");

const getUsers = async (userName, password) => {
  try {
    const user = await User.findOne({
      where: { userName: userName, password: password },
      attributes: ["id", "userName", "password"],
    });
    if (user) {
      return { user, access: true };
    } else {
      return { access: false };
    }
  } catch (error) {
    return error;
  }
};
module.exports = getUsers;
