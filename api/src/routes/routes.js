const { Router } = require("express");
const { getTypes } = require("../controllers/allControllers");
const routerUser = require("./userRouter");
const pokemonRouter = require("./pokemonrouter");

const router = Router();

router.use("/pokemons", pokemonRouter);
router.get("/types", async (req, res) => {
  try {
    const getType = await getTypes();
    res.status(200).json(getType);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
router.use("/user", routerUser);

module.exports = router;
