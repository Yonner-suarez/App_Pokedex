const newOrdenAlf = (state, action) => {
  const newOrder = state.pokemonsAll.sort((a, b) => {
    if (a.name > b.name) {
      return "Ascendente" === action.payload ? 1 : -1;
    }
    if (a.name < b.name) {
      return "Descendente" === action.payload ? 1 : -1;
    }
    return 0;
  });
  return newOrder;
};
const newOrdenAtack = (state, action) => {
  const newOrder = state.pokemonsAll.sort((a, b) => {
    if (a.ataque > b.ataque) {
      return "Ascendente" === action.payload ? 1 : -1;
    }
    if (a.ataque < b.ataque) {
      return "Descendente" === action.payload ? 1 : -1;
    }
    return 0;
  });
  return newOrder;
};

const filterTypes = (state, action) => {
  const newFilter = state.copyPokemonsAll.filter((pokemons) => {
    const filtrado = pokemons.Types.filter((ti) => ti.name === action.payload);
    if (filtrado.length) {
      return pokemons;
    } else {
      return null;
    }
  });
  return newFilter;
};

const forOrigin = (state, action) => {
  const filtradoApi = state.copyPokemonsAll.filter(
    (pokemons) => !isNaN(pokemons.id)
  );
  const filtradoDbb = state.copyPokemonsAll.filter((po) => isNaN(po.id));

  return action.payload === "dbb" ? filtradoDbb : filtradoApi;
};

module.exports = {
  newOrdenAlf,
  newOrdenAtack,
  filterTypes,
  forOrigin,
};
