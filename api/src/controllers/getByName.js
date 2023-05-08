const { Pokemon, Type } = require("../db");
const axios = require("axios");

require("dotenv").config();

const { URL_BASE } = process.env;

const getByName = async (name) => {
  const nameToLOwerCase = name.toLowerCase();

  //recibo por parametro el nombre del pokemon a buscar, debido a que en la base de datos todos estan guardados en minusculas, convierto ese nombre recibido en minusculas para asegurarme de que la busqueda no falle por el "Case sensitive"

  try {
    //busco en el modelo o tabla Pokemon un pokemon en especifico donde el nombre sea igual al nombre que me pasaron por parametro, incluyendo el modelo Type incluyendo los atributos que la peticion requiere
    const db = await Pokemon.findOne({
      where: {
        name: nameToLOwerCase,
      },
      include: Type,
      through: {
        attributes: [],
      },
    });

    if (db) {
      //si existe ese pokemon creo un objeto con la propiedades necesarias para enviar la respuesta
      const pok = {
        id: db.id,
        name: db.name,
        image: db.image,
        vida: db.vida,
        ataque: db.ataque,
        defensa: db.defensa,
        velocidad: db.velocidad,
        altura: db.altura,
        peso: db.peso,
        Types: db.Types.map((el) => {
          return { slot: el.slot, name: el.name };
          //como types es un array de obj, puesto que el pokemon puede contener mas de un tipo me aseguro de que me mande la informacion necesaria y correcta
        }),
      };
      //retorno el obj creado dentro de un array
      return [pok];
    } else {
      //si no hay el pokemon que me solicitaron en la bdd, lo busco en la API haciendo un peticion de tipo GET a la URL base que defini en el las variables de entorno solicitando el nombre en especifico
      const resp = await axios.get(`${URL_BASE}/${nameToLOwerCase}`);
      const { data } = resp;
      const pokemonName = [
        {
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"]["front_default"],
          vida: data.stats[0]?.base_stat,
          ataque: data.stats[1]?.base_stat,
          defensa: data.stats[2]?.base_stat,
          velocidad: data.base_experience,
          altura: data.height,
          peso: data.weight,
          Types: data.types.map((ele) => {
            return {
              slot: ele.slot,
              name: ele.type.name,
            };
          }),
        },
      ];
      //se hace el mismo procedimiento como si fuese a buscar en la base de datos y retorno el array con el objeto que contega ese pokemon
      return pokemonName;
    }
  } catch (error) {
    //dado el caso de ocurrir un error en el proceso anterior el catch se encargara de gestionar ese error returnando un array vacio que servira para validar si si hubo respuesta o no
    return [];
  }
};

module.exports = getByName;
