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
} = require("./types");

export const getPokemons = () => {
  try {
    return async (dispatch) => {
      const respuesta = await axios.get("http://localhost:3001/pokemons");
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
  try {
    return async (dispatch) => {
      const resp = await axios.get("http://localhost:3001/types");
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
  return {
    type: NEXT_PAGE,
  };
};
export const nextTenPages = () => {
  return {
    type: NEXT_TEN_PAGES,
  };
};

export const previusPage = () => {
  return {
    type: PREVIUS_PAGE,
  };
};
export const previusPageTen = () => {
  return {
    type: PREVIUS_PAGE_TEN,
  };
};

export const orderAtack = (orden) => {
  return {
    type: ORDER_ATACK,
    payload: orden,
  };
};
export const orderAlfabetic = (orden) => {
  return {
    type: ORDER_ALF,
    payload: orden,
  };
};

export const filterPokemons = (obj) => {
  return {
    type: FILTER,
    payload: obj,
  };
};

export const search = (pokemonsFinded) => {
  return {
    type: SEARCH_POK,
    payload: pokemonsFinded,
  };
};
export const allPokAgain = () => {
  return {
    type: ALL_POK_AGAIN,
  };
};
export const filterForApiOrBdd = (filtrado) => {
  return {
    type: FILTER_FOR_API,
    payload: filtrado,
  };
};
