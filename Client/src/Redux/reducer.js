const {
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
  NEXT_TEN_PAGES,
  PREVIUS_PAGE_TEN,
  USER,
} = require("./types");
const {
  newOrdenAlf,
  newOrdenAtack,
  filterTypes,
  forOrigin,
} = require("./logicReducer");

const initialState = {
  pokemonsAll: [],
  copyPokemonsAll: [],
  orderPok: [],
  types: [],
  numPage: 1,
  search: [],
  user: {},
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
    case NEXT_TEN_PAGES:
      return {
        ...state,
        numPage: state.numPage + 10,
      };
    case PREVIUS_PAGE:
      return {
        ...state,
        numPage: state.numPage - 1,
      };
    case PREVIUS_PAGE_TEN:
      return {
        ...state,
        numPage: state.numPage - 10,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case ORDER_ALF:
      return {
        ...state,
        pokemonsAll: newOrdenAlf(state, action),
        copyPokemonsAll: newOrdenAlf(state, action),
      };
    case ORDER_ATACK:
      return {
        ...state,
        pokemonsAll: newOrdenAtack(state, action),
        copyPokemonsAll: newOrdenAtack(state, action),
      };
    case FILTER:
      return {
        ...state,
        pokemonsAll: filterTypes(state, action),
        numPage: 1,
      };
    case FILTER_FOR_API:
      return {
        ...state,
        pokemonsAll: forOrigin(state, action),
        numPage: 1,
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
    case USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
