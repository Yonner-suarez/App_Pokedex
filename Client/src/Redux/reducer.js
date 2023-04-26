import {
  GET_ALL_POKEMONS,
  NEXT_PAGE,
  GET_TYPES,
  ORDER,
  FILTER,
  RESET,
  SEARCH_POK,
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
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case ORDER:
      const newOrder = state.pokemonsAll.sort((a, b) => {
        if (a.id > b.id) {
          return "Ascendente" === action.payload ? 1 : -1;
        }
        if (a.id < b.id) {
          return "Descendente" === action.payload ? 1 : -1;
        }
        return 0;
      });
      const newOrder1 = state.copyPokemonsAll.sort((a, b) => {
        if (a.id > b.id) {
          return "Ascendente" === action.payload ? 1 : -1;
        }
        if (a.id < b.id) {
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
      const newFilter = state.pokemonsAll.filter(
        (pokemons) => pokemons.tipo == action.payload
      );
      return {
        ...state,
        copyPokemonsAll: newFilter,
      };
    case RESET:
      return {
        ...state,
        copyPokemonsAll: state.pokemonsAll,
      };
    case SEARCH_POK:
      return {
        ...state,
        search: [action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
