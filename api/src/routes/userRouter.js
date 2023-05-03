const { Router } = require("express");
const { getUsers, postUser } = require("../controllers/allControllers");

const routerUser = Router();

routerUser.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerUser.post("/", async (req, res) => {
  const { user, password } = req.body;

  if (![user, password].every(Boolean)) {
    res.status(500).json({ error: "Missing data to create the user" });
  }

  try {
    await postUser(user, password);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = routerUser;
