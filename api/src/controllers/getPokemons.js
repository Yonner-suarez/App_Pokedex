//este controlador contendra tres funciones la primera para hacer la peticion a la API, la segunda hace la peticion a la bdd con los pokemons creados y la tercera une esas dos respuestas que dan las anteriores y retorna todos los pokemons

const axios = require("axios");
const { Pokemon, Type, User } = require("../db");

require("dotenv").config();

const { URL_BASE } = process.env;

//creo una memoria cache para guardar los pokemons en la peticion de la API externa
let cachePokemons = null;

const getPokemonsApi = async () => {
  if (cachePokemons) {
    //si ya se hizo una peticion previa a la API externa y los pokemons se encuentran guardados en la memoria, retorna ese array con los personajes
    return cachePokemons;
  }

  //si la funcion no es cortada con el condicional anterior se crea un array vacio que contendra todos los pokemon en la request de la API externa, demas se declara una variable la cual gurdara un obj con la info de cada pokemon
  let fullPok = [];
  let pok;

  //se asigna un current donde inicie en la URL base con el limit igual a 100, este current es para implementar la logica del bucle y poder traer todos los pokemons en un tiempo eficiente
  let nextUrl = `${URL_BASE}?limit=100`;

  while (nextUrl) {
    //mientras que el current no sea igual a null este bucle se ira a seguir ejecutando
    try {
      //en primer lugar hago una peticion de tipo GET al current que corresponde a los primeros cien pokemons
      const resp = await axios.get(nextUrl);

      //desestructuro los resultados que contiene las url de cada pokemons del 1 al 100 y la propiedad next que contiene la URL base pero con el el limite de los proximos 100 pokemons
      const { results, next } = resp.data;

      //hago un mapeo a la prop results que es un array, y este map me devuelve un array de links donde se alverga la info de cada pokemon
      const urls = results.map((result) => result.url);

      //implemento el Promise.all mapeando cada url y haciendo axios.get a cada url
      const respuesta = await axios.all(
        urls.map(async (url) => await axios.get(url))
      );

      //con la respuesta que da la peticion extraigo la info
      const data = respuesta.map((info) => info.data);

      const info = data.map((personaje) => {
        //con la info armo un array con objetos que contengan los tipos de los pokemons
        const newObj = personaje.types.map((ele) => {
          return {
            slot: ele.slot,
            name: ele.type.name,
          };
        });

        //creo con la variable que declare un obj de con la info de cada pokemon
        pok = {
          id: personaje.id,
          name: personaje.name,
          image: personaje.sprites.other["official-artwork"]["front_default"],
          vida: personaje.stats[0]?.base_stat,
          ataque: personaje.stats[1]?.base_stat,
          defensa: personaje.stats[2]?.base_stat,
          velocidad: personaje.base_experience,
          altura: personaje.height,
          peso: personaje.weight,
          Types: newObj,
        };
        //del mapeo de la info retorno los obj de cada pokemon
        return pok;
      });

      //agrego los obj al array declarado al inicio de la funcion
      fullPok.push(...info);
      //y guardo una copia en el cache
      cachePokemons = fullPok;

      //por ultimo el current avanza pidiendo los siguiente 100 personajes
      nextUrl = next;
    } catch (error) {
      //si ocurre un error en la peticion asincronica el current pasa a ser null para no generar un bucle infinito y se retorna el error
      nextUrl = null;
      return error;
    }
  }
  //en ultimo momento cuando el bucle llegue a su fin la funcion retorna el array con todos los obj de lso pokemons
  return fullPok;
};

const getPokemonsByBdd = async (id) => {
  //esta funcion hara la peticion asincronica a la bdd trayendo los pokemons especificos de cada usuario
  try {
    if (id) {
      // el identificador que recibe la funcion por parametro corresponde al del usuario, por eso se busca al usario donde el id corresponda
      const buscaUser = await User.findOne({
        where: { id: id },
      });

      //si ese usuario existe que debe existir se buscan todos los pokemons que correspondan al usuario en especifico
      if (buscaUser) {
        const dbPok = await Pokemon.findAll({
          where: { UserId: buscaUser.id },
          include: {
            model: Type,
            through: {
              attributes: [],
            },
          },
        });

        //se valida que si el usuario no tine pok retorna un array vacio
        if (dbPok.length === 0) return [];

        // si el usuario tiene pokemons creados y relacionados para ese id los retornamos
        return dbPok;
      }

      //si no hay usuario se retorna un array vacio indicando que no hay okemons creados ni usuario
      return [];
    }
    //lo mismo se valida que si no me pasan un id, no hay usuario y por consiguiente no hay usuario y retorno un array vacio.
    return [];
  } catch (error) {
    //si en la peticion de la bdd ocurre un error el catch se encarga de manejarlo y lo retorna
    return error;
  }
};

const getPokemons = async (id) => {
  //por ultimo esta funcion es la unica que se cominica con la ruta y esta se encargar de ejcutar las funciones anteriormente hechas
  try {
    const poke = await getPokemonsApi();
    const pokBdd = await getPokemonsByBdd(id);

    //si en la ejecucion de la funcion que trae los pokemons de la bdd viene vacio solo se retorna los que fueron pedidos desde la API externa
    if (pokBdd.length === 0) {
      const soloApi = [...poke];
      return soloApi;
    }

    //si esta funcion no se corta en este condicional retorna un array con lo que ya tenia lo ejecucion de la bdd y la ejecucion de la api externa
    const allpoks = [...pokBdd, ...poke];
    return allpoks;
  } catch (error) {
    //si en la ejecucion de estas dos funciones hay algun error lo retorno
    return error;
  }
};

module.exports = {
  getPokemons,
  cachePokemons,
};

/*

?? id= resp.data.id
!! image= resp.data.sprites.other.dream_world.front_default
* name = resp.data.name
! altura = resp.data.heigth
?tipo = resp.data.types[0].type.name
* peso = resp.data.weigth
!vida= 
! 1OPCION = let vit = resp.data.stats.map((vita) => vita.stat.name);
   ! let vita = resp.data.stats.map((vita) => vita.base_stat);
   ! let vitafull = [vit[0], vita[0]];
! 2OPCION= resp.data.stats[0].base_stat

?ataque= let vit = resp.data.stats.map((vita) => vita.stat.name);
   ? let vita = resp.data.stats.map((vita) => vita.base_stat);
    ?let vitafull = [vit[1], vita[1]];
?2OPCION= resp.data.stats[1].base_stat
*defensa=let vit = resp.data.stats.map((vita) => vita.stat.name);
    *let vita = resp.data.stats.map((vita) => vita.base_stat);
    *let vitafull = [vit[2], vita[2]];
*2OPCION= resp.data.stats[2].base_stat
! velocidad =resp.data.base_experience
*/

//   .then((res) => {
//         promises = res.map((url) => axios.get(url));
//         return promises;
//       })
//       .then((promisesP) => {
//         Promise.all(promisesP).then((resp) => {
//           resp.forEach((resp) => {
//             allPok.push({
//               id: resp.data.id,
//               name: resp.data.name,
//               image: resp.data.sprites.other.dream_world.front_default,
//               vida: resp.data.stats[0]?.base_stat,
//               ataque: resp.data.stats[1]?.base_stat,
//               defensa: resp.data.stats[2]?.base_stat,
//               velocidad: resp.data.base_experience,
//               altura: resp.data.height,
//               peso: resp.data.weight,
//               tipo: resp.data.types[0]?.type.name,
//             });
//           });
//           res.status(200).json(allPok);
//       });
//       })
//! con promise.all()
