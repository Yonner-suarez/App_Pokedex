const axios = require("axios");
require("dotenv").config();
const { Type } = require("../db");

const { URL } = process.env;
const getTypes = (req, res) => {
  let allTypes = [];
  let soloType = new Set();
  let urls;
  let promises;

  axios
    .get(`${URL}?limit=10`)
    .then((res) => {
      urls = res.data.results.map((dat) => dat.url);
      return urls;
    })
    .then((res) => {
      promises = res.map((url) => axios.get(url));
      return promises;
    })
    .then((promisesP) => {
      Promise.all(promisesP).then(async (resp) => {
        resp.forEach((resp) => {
          allTypes.push({
            tipo: resp.data.types,
          });
        });
        allTypes.map((type) => {
          type.tipo.map((tipos) => {
            soloType.add({ name: tipos.type.name });
          });
        });

        const array = Array.from(soloType);
        res.status(200).json(array);

        await Type.bulkCreate(array);
      });
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
};
module.exports = getTypes;
