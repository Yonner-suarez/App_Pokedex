import axios from "axios";

const {
  GET_ALL_POKEMONS,
  ALL_POK_AGAIN,
  FILTER,
  FILTER_FOR_API,
  GET_TYPES,
  NEXT_PAGE,
  ORDER_ALF,
  ORDER_ATACK,
  PREVIUS_PAGE,
  SEARCH_POK,
  PREVIUS_PAGE_TEN,
  NEXT_TEN_PAGES,
  USER,
} = require("./types");

export const getPokemons = (id) => {
  //esta action es la encargada de hacer la peticion de tipo GET al back, obteniendo los datos con la info de cada uno de los pokemons
  try {
    return async (dispatch) => {
      const respuesta = await axios.get(`/pokemons?id=${id}`);
      const { data } = respuesta;
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: data,
      });
    };
  } catch (error) {
    alert(error.message);
  }
};

export const getTypes = () => {
  //esta action es la encargada de hacer la peticion de tipo GET al back, obteniendo los datos con la info de cada uno de los tipos de pokemons
  try {
    return async (dispatch) => {
      const resp = await axios.get("/types");
      const { data } = resp;
      return dispatch({
        type: GET_TYPES,
        payload: data,
      });
    };
  } catch (error) {
    alert(error.message);
  }
};

export const nextPage = () => {
  //esta action es la encargada de hacer el cambio de pagina + 1 
  return {
    type: NEXT_PAGE,
  };
};
export const nextTenPages = () => {
  //esta action es la encargada de hacer el cambio de pagina + 10
  return {
    type: NEXT_TEN_PAGES,
  };
};

export const previusPage = () => {
  //esta action es la encargada de hacer el cambio de pagina - 1
  return {
    type: PREVIUS_PAGE,
  };
};
export const previusPageTen = () => {
  //esta action es la encargada de hacer el cambio de pagina - 10
  return {
    type: PREVIUS_PAGE_TEN,
  };
};

export const orderAtack = (orden) => {
  //esta action es la encargada de mandar el orden en el cual deben organizarse por ataque las cartas
  return {
    type: ORDER_ATACK,
    payload: orden,
  };
};
export const orderAlfabetic = (orden) => {
  //esta action es la encargada de mandar el orden en el cual deben organizarse alfabeticamente las cartas
  return {
    type: ORDER_ALF,
    payload: orden,
  };
};

export const filterPokemons = (obj) => {
  //esta action es la encargada de mandar el filtrado de los pokemons por el tipo
  return {
    type: FILTER,
    payload: obj,
  };
};

export const search = (pokemonsFinded) => {
  //esta action es la encargada de mandar la info del pokemon buscado para ser guardado en el estado global
  return {
    type: SEARCH_POK,
    payload: pokemonsFinded,
  };
};
export const allPokAgain = () => {
  //esta action es la encargada de renderizar de nuevo todos los pokemons
  return {
    type: ALL_POK_AGAIN,
  };
};
export const filterForApiOrBdd = (filtrado) => {
  //esta action es la encargada de mandar el filtrado de los pokemons por su origen (API o BDD)
  return {
    type: FILTER_FOR_API,
    payload: filtrado,
  };
};
export const getUser = (user) => {
  //esta action es la encargada de obtener el usuario correspondiente
  return {
    type: USER,
    payload: user,
  };
};
