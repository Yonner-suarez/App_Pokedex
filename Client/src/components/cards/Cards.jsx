import { useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import { allPokAgain } from "../../Redux/action";

const Cards = ({ allPokemons, search }) => {
  //recibe del estado global todos los pokemons y el pokemon a buscar
  const dispatch = useDispatch();
  const onClick = (event) => {
    // esta funcion se ejecuta cuando se da click en el boto allPokemon haciendo un dispatch de una action al reducer
    event.preventDefault();
    dispatch(allPokAgain());
  };
  return (
    <div className={style.contenedor}>
      <div className={style.contenedorBoton}>
        <button className={style.all} onClick={onClick}>
          AllPokemons
        </button>
        <br />
        <br />
        <br />
        <br />
      </div>
      {/*me pregunto el search quevino del estado global es un array para comprobar su existencia, si es un array pregunto por su longitud si es difernetes de cero mapeo y retorno una carta con las caracteristicas necesarias, si algunas de las condiciones no se cumple pasa a la seugnda parte del ternario */}
      {Array.isArray(search) && search.length ? (
        search.map((obj) => {
          return (
            <Card
              key={obj.id}
              id={obj.id}
              name={obj.name}
              tipo={obj.Types}
              image={obj?.image}
            />
          );
        })
      ) : /*pregunto por la longitud si no hay pokemons en el estado global renderizo una img de carga, si el estado global ya esta cargado con todos los pokemons lo mapeo y renderizo una card por cada uno de ellos*/
      !allPokemons.length ? (
        <img
          src="https://c.tenor.com/XjV2_OLEE_EAAAAC/spin-loading.gif"
          alt=""
          className={style.img}
        />
      ) : (
        allPokemons.map((pok) => {
          return (
            <Card
              key={pok.id}
              id={pok.id}
              name={pok.name}
              tipo={pok.Types}
              image={pok.image}
            />
          );
        })
      )}
    </div>
  );
};

export default Cards;
