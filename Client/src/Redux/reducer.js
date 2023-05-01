import {
  GET_ALL_POKEMONS,
  NEXT_PAGE,
  GET_TYPES,
  ORDER_ATACK,
  FILTER,
  PREVIUS_PAGE,
  SEARCH_POK,
  ALL_POK_AGAIN,
  ORDER_ALF,
  FILTER_FOR_API,
} from "./action";

const initialState = {
  pokemonsAll: [],
  copyPokemonsAll: [],
  orderPok: [],
  types: [],
  numPage: 1,
  search: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemonsAll: action.payload,
        copyPokemonsAll: action.payload,
      };

    case NEXT_PAGE:
      return {
        ...state,
        numPage: state.numPage + 1,
      };
    case PREVIUS_PAGE:
      return {
        ...state,
        numPage: state.numPage - 1,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case ORDER_ALF:
      const newOrderAlf = state.pokemonsAll.sort((a, b) => {
        if (a.name > b.name) {
          return "Ascendente" === action.payload ? 1 : -1;
        }
        if (a.name < b.name) {
          return "Descendente" === action.payload ? 1 : -1;
        }
        return 0;
      });
      const newOrderAlf1 = state.copyPokemonsAll.sort((a, b) => {
        if (a.name > b.name) {
          return "Ascendente" === action.payload ? 1 : -1;
        }
        if (a.name < b.name) {
          return "Descendente" === action.payload ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        pokemonsAll: newOrderAlf,
        copyPokemonsAll: newOrderAlf1,
      };
    case ORDER_ATACK:
      const newOrder = state.pokemonsAll.sort((a, b) => {
        if (a.ataque > b.ataque) {
          return "Ascendente" === action.payload ? 1 : -1;
        }
        if (a.ataque < b.ataque) {
          return "Descendente" === action.payload ? 1 : -1;
        }
        return 0;
      });
      const newOrder1 = state.copyPokemonsAll.sort((a, b) => {
        if (a.ataque > b.ataque) {
          return "Ascendente" === action.payload ? 1 : -1;
        }
        if (a.ataque < b.ataque) {
          return "Descendente" === action.payload ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        pokemonsAll: newOrder,
        copyPokemonsAll: newOrder1,
      };
    case FILTER:
      const newFilter = state.pokemonsAll.filter((pokemons) => {
        const filtrado = pokemons.Types.filter(
          (ti) => ti.name === action.payload
        );
        if (filtrado.length) {
          return pokemons;
        }
      });

      return {
        ...state,
        pokemonsAll: newFilter,
      };
    case FILTER_FOR_API:
      const filtradoApi = state.copyPokemonsAll.filter(
        (pokemons) => !isNaN(pokemons.id)
      );
      const filtradoDbb = state.copyPokemonsAll.filter((po) => isNaN(po.id));

      return {
        ...state,
        pokemonsAll: action.payload === "dbb" ? filtradoDbb : filtradoApi,
      };

    case SEARCH_POK:
      return {
        ...state,
        search: action.payload,
      };
    case ALL_POK_AGAIN:
      return {
        ...state,
        pokemonsAll: state.copyPokemonsAll,
        copyPokemonsAll: state.copyPokemonsAll,
        search: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
