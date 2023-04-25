const axios = require("axios");
require("dotenv").config();
const { Type } = require("../db");

const getTypes = async (req, res) => {
  try {
    const resp = await axios.get(`https://pokeapi.co/api/v2/type`);

    for (tipo of resp.data.results) {
      const existe = await Type.findOne({ where: { name: tipo.name } });
      if (existe) return res.json(await Type.findAll());
      await Type.create({ name: tipo.name });
    }
    res.status(200).json(await Type.findAll());
  } catch (error) {
    res.status(404).json({ error: error.message });
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
