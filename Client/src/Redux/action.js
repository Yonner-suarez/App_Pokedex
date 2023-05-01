import axios from "axios";

export const GET_ALL_POKEMONS = " GET_ALL_POKEMONS";
export const NEXT_PAGE = "NEXT_PAGE";
export const GET_TYPES = "GET_TYPES";
export const ORDER_ATACK = "ORDER_ATACK";
export const ORDER_ALF = "ORDER_ALF";
export const FILTER = "FILTER";
export const SEARCH_POK = "SEARCH_POK";
export const ALL_POK_AGAIN = "ALL_POK_AGAIN";
export const FILTER_FOR_API = "FILTER_FOR_API";
export const PREVIUS_PAGE = "PREVIUS_PAGE";

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

export const previusPage = () => {
  return {
    type: PREVIUS_PAGE,
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
