//el router: pokemon Router se encargará de manejar todas la reuqest a /pokemons

const { Router } = require("express");
const {
  getPokemons,
  getPokemonsId,
  postPokemon,
  getByName,
} = require("../controllers/allControllers");

const pokemonRouter = Router();

//?Ruta para obtener AllPokemons o NamePokemon

pokemonRouter.get("/", async (req, res) => {
  //recibe por query un name que sera para buscar un pokemon en especifico y un id que sera el identificador del usuario
  const { name, id } = req.query;

  if (!name && id) {
    //si no hay name y si hay id
    try {
      //ejecutamos el handler getPokemons pasandole la query id
      const allPok = await getPokemons(id);

      // si por alguna razon el array que retorna getPokemons viene vacio respondo con un mensaje 500, error del servidor
      if (!allPok.length) {
        return res.status(500).json(`Something went wrong`);
      }
      //sino retorno el array con todos los pokemons y un status 200
      return res.status(200).json(allPok);
    } catch (error) {
      //si al momento de la ejecucion del handler hay un error respondo al cliente con un mensaje del error
      res.status(404).json({ error: error.message });
    }
  }

  if (name) {
    //si me envian por query el name
    try {
      //ejecuto el controller getByName pasando la query
      const busca = await getByName(name);
      //si el array que retorna getByName viene vacio retorno un mensaje con la info correspondiente
      if (!busca.length) {
        return res.status(500).json({ message: `pokemon ${name} not found` });
      }
      //sino retorno el array con la busqueda y un status 200
      res.status(200).json(busca);
    } catch (error) {
      //si al momento de la ejecucion del handler hay un error respondo al cliente con un mensaje del error
      res.status(404).json({ error: error.message });
    }
  }
});

//? Ruta para un pokemon por ID
pokemonRouter.get("/:idPokemon", async (req, res) => {
  //la request recibira por params el id de un pokemon es especifico
  const { idPokemon } = req.params;
  try {
    //tratara de ejecutar el controller getPokemonsId el cual retornara un array con la info de un pokemon es especifico
    const getId = await getPokemonsId(idPokemon);
    //devloviendo una respuesta 200 con el pokemon
    res.status(200).json(getId);
  } catch (error) {
    //si al momento de la ejecucion del controller hay un error respondo al cliente con un mensaje del error
    res.status(404).json({ error: error.message });
  }
});

//?Ruta para agregar un Pokemon a la BDD
pokemonRouter.post("/", async (req, res) => {
  //la reuqest recibira un objeto con la informacion del pokemon, un userName y una password
  const { pok, userName, password } = req.body;

  //desestructuro la info que se requiere para crear el pokemon
  const { name, image, vida, ataque, defensa, velocidad, altura, peso, tipo } =
    pok;

  //valido que los datos necesarios existan si no respondo con un error, faltan datos
  if (![name, image, vida, ataque, defensa].every(Boolean)) {
    res.status(400).json({ Error: "Missing data" });
  }

  try {
    //ejecuto el controller postPokemon que se encargará de crear el pokmon en la bdd y le paso la informacion correspondiente
    const agrega = await postPokemon(
      {
        name,
        image,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        tipo,
      },
      userName,
      password
    );
    //respondo con un status 200 y el mensaje que el controller me envie
    res.status(200).json(agrega);
  } catch (error) {
    //si al momento de la ejecucion del controller hay un error respondo al cliente con un mensaje del error
    res.status(400).json({ Error: error.message });
  }
});

module.exports = pokemonRouter;
