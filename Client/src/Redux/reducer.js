import { GET_ALL_POKEMONS, NEXT_PAGE, GET_TYPES, ORDER } from "./action";

const initialState = {
  pokemonsAll: [],
  orderPok: [],
  types: [],
  numPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemonsAll: action.payload,
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
      return {
        ...state,
        pokemonsAll: newOrder,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
