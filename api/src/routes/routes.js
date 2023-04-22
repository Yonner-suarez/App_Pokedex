const { Router } = require("express");
const { getTypes } = require("../controllers/allControllers");

const pokemonRouter = require("./pokemonrouter");

const router = Router();

router.use("/pokemons", pokemonRouter);
router.get("/types", getTypes);

module.exports = router;
