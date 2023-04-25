const axios = require("axios");
require("dotenv").config();
const { Type } = require("../db");

const { URL } = process.env;
const getTypes = (req, res) => {
  let soloType = new Set();
  let urls;
  let array = [];

  axios
    .get(`${URL}/type`)
    .then((res) => {
      urls = res.data.results.map((dat) => dat.url);
      return urls;
    })

    .then((urls) => {
      axios.all(urls.map((url) => axios.get(url))).then(async (resp) => {
        let aux = resp.map((data) => data);
        aux.forEach((obj) => {
          const { data } = obj;
          const { types } = data;
          types.map((tipo) => {
            const { name } = tipo.type;
            soloType.add(name);
          });
        });
        soloType.forEach((nam) => {
          let obj = {
            name: nam,
          };
          array.push(obj);
        });

        res.status(200).json(array);

        for (const namesType of array) {
          const busca = await Type.findOne({ where: { name: namesType.name } });

          if (busca) {
            return res.status(200).json(await Type.findAll());
          }
          await Type.create({ name: namesType.name });
        }
      });
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
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
