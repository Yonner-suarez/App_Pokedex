const { Router } = require("express");
const { getUsers, postUser } = require("../controllers/allControllers");

const routerUser = Router();

routerUser.get("/", async (req, res) => {
  const { userName, password } = req.query;
  try {
    const users = await getUsers(userName, password);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerUser.post("/", async (req, res) => {
  const { userName, password } = req.body;

  if (![userName, password].every(Boolean)) {
    res.status(500).json({ error: "Missing data to create the user" });
  }

  try {
    const respuesta = await postUser(userName, password);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = routerUser;
