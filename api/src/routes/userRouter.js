//este router se encargará de manejar todas la rutas que se dirijan a /user

const { Router } = require("express");
const { getUsers, postUser } = require("../controllers/allControllers");

const routerUser = Router();

routerUser.get("/", async (req, res) => {
  //esta ruta de tipo GET recibira por query un userName y password
  const { userName, password } = req.query;
  try {
    //ejecutara el controller pasandole la query de la request
    const users = await getUsers(userName, password);
    //esto devolvera un objeto con el user y el access en true o en false
    res.status(200).json(users);
  } catch (error) {
    //si al momento de la ejecucion del controller hay un error respondo al cliente con un mensaje del error
    res.status(404).json({ error: error.message });
  }
});

routerUser.post("/", async (req, res) => {
  //esta ruta recibira por body un userName y un password
  const { userName, password } = req.body;

  //verifico que el userName y la password si vengan
  if (![userName, password].every(Boolean)) {
    //si no hay userName o password respondo con un status 500 con el mensaje correspodiente
    res.status(500).json({ error: "Missing data to create the user" });
  }

  try {
    //sino ejecuto el controller pasandole los datos correspondientes para crear un user
    const respuesta = await postUser(userName, password);
    //si todo sale OK respondo con el mensaje que me devuelve el controller
    res.status(200).json(respuesta);
  } catch (error) {
    //si al momento de la ejecucion del controller hay un error respondo al cliente con un mensaje del error
    res.status(404).json({ error: error.message });
  }
});

module.exports = routerUser;
