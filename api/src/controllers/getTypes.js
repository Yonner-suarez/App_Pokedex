//este controller tene la resposabiidad de pedir a la API externa todos los tipos de pokemons

const axios = require("axios");
require("dotenv").config();
const { Type } = require("../db");
require("dotenv").config();

const { URL_TYPES } = process.env;

const getTypes = async () => {
  try {
    //se hace una peticion de tpio GET a la URL de types
    const resp = await axios.get(`${URL_TYPES}`);
 
    
    //recorro el array que me llega en la results de la data y busco en la bdd si el tipo ya existe, si existe retrno los tipos de pokemons con un finAll, si no existen creo los tipos detro de la tabla y el modelo
    for (tipo of resp.data.results) {
      const existe = await Type.findOne({ where: { name: tipo.name } });
      if (existe) return await Type.findAll();
      await Type.create({ name: tipo.name });
    }
    //luego de recorrer todos los tipos retorno el array que me manda el findAll
    return await Type.findAll();
  } catch (error) {
    //si ocurre algun error en las peticiones asincronicas se retorna el error
    return error;
  }
};
module.exports = getTypes;

// console.log(allTypes);
// allTypes.map((type) => {
//   type.tipo.map((tipos) => {
//     soloType.add({ name: tipos.type.name });
//   });
// });
//   console.log(allTypes);
//   });
//  })
// .then((res) => {
//   promises = res.map((url) => axios.get(url));
//   return promises;
// })
// .then((promisesP) => {
//   Promise.all(promisesP).then(async (resp) => {
//     resp.forEach((resp) => {
//       allTypes.push({
//         tipo: resp.data.types,
//       });
//     });
//     allTypes.map((type) => {
//       type.tipo.map((tipos) => {
//         soloType.add({ name: tipos.type.name });
//       });
//     });

//     const array = Array.from(soloType);
//     res.status(200).json(array);

//     await Type.bulkCreate(array);
// });
//  })
