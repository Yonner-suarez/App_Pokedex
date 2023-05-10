const { Router } = require("express");
const { getTypes } = require("../controllers/allControllers");
const routerUser = require("./userRouter");
const pokemonRouter = require("./pokemonrouter");

const router = Router();

//cada vez que legue una request a /pokemons el router usara el pokemonRouter
router.use("/pokemons", pokemonRouter);
//cada vez que legue una request a /user el router usara el routerUser
router.use("/user", routerUser);
//si llega una peticion a /types el mismo router se encargará de esa peticion
router.get("/types", async (req, res) => {
  try {
    const getType = await getTypes();
    res.status(200).json(getType);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
