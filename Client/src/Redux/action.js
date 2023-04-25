import axios from "axios";

export const GET_ALL_POKEMONS = " GET_ALL_POKEMONS";
export const NEXT_PAGE = "NEXT_PAGE";
export const GET_TYPES = "GET_TYPES";
export const ORDER = "ORDER";
export const FILTER = "FILTER";

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
    console.log(error.message);
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
    console.log(error.message);
  }
};

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

export const order = (orden) => {
  return {
    type: ORDER,
    payload: orden,
  };
};

export const filterPokemons = (idFiltro) => {
  return {
    type: FILTER,
    payload: idFiltro,
  };
};
