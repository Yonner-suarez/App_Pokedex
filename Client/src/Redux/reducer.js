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
      //cuando traigo todos los pokemons los guardo en las props pokemonsAll y en copyPokemonsAll para manejarlos desde el esto global
      return {
        ...state,
        pokemonsAll: action.payload,
        copyPokemonsAll: action.payload,
      };

    case NEXT_PAGE:
      //aumenta en 1 la pagina
      return {
        ...state,
        numPage: state.numPage + 1,
      };
    case NEXT_TEN_PAGES:
      //aumenta en 10 las paginas
      return {
        ...state,
        numPage: state.numPage + 10,
      };
    case PREVIUS_PAGE:
      //reduce en 1 las paginas
      return {
        ...state,
        numPage: state.numPage - 1,
      };
    case PREVIUS_PAGE_TEN:
      //reduce en 10 las paginas
      return {
        ...state,
        numPage: state.numPage - 10,
      };
    case GET_TYPES:
      //guarda en el array de types la data que llega de la peticion de la accion
      return {
        ...state,
        types: action.payload,
      };
    case ORDER_ALF:
      //oredena alfabeticamente a los contenedores de todos los pokemons
      return {
        ...state,
        pokemonsAll: newOrdenAlf(state, action),
        copyPokemonsAll: newOrdenAlf(state, action),
      };
    case ORDER_ATACK:
      //oredena por ataque a los contenedores de todos los pokemons
      return {
        ...state,
        pokemonsAll: newOrdenAtack(state, action),
        copyPokemonsAll: newOrdenAtack(state, action),
      };
    case FILTER:
      //filtra solo a pokemonsAll por los diferentes tipos tomando como punto de partida la pag numero 1 en adelante
      return {
        ...state,
        pokemonsAll: filterTypes(state, action),
        numPage: 1,
      };
    case FILTER_FOR_API:
      //filtra solo a pokemonsAll por el diferente origen tomando como punto de partida la pag numero 1 en adelante
      return {
        ...state,
        pokemonsAll: forOrigin(state, action),
        numPage: 1,
      };

    case SEARCH_POK:
      //guarda en el search la data del pokemon que se busco por el searchBar
      return {
        ...state,
        search: action.payload,
      };
    case ALL_POK_AGAIN:
      //trae de nuevo a todos los pokemons depues de un filtrado
      return {
        ...state,
        pokemonsAll: state.copyPokemonsAll,
        search: [],
      };
    case USER:
      //guarda al usuario que hace login en el estado global para luego ser utilizado
      return {
        ...state,
        user: action.payload,
      };
    default:
      //si ninguno de los casos del action.type se cumple me devuelve la copia del estado global
      return {
        ...state,
      };
  }
};

export default rootReducer;
