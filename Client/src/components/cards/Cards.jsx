import { useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import { allPokAgain } from "../../Redux/action";

const Cards = ({ allPokemons, search }) => {
  const dispatch = useDispatch();
  const onClick = (event) => {
    event.preventDefault();
    dispatch(allPokAgain());
  };
  return (
    <div className={style.contenedor}>
      <div className={style.contenedorBoton}>
        <button className={style.all} onClick={onClick}>
          AllPokemons
        </button>
      </div>
      {search.length !== 0
        ? search.map((obj) => {
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
        : allPokemons.map((pok) => {
            return (
              <Card
                key={pok.id}
                id={pok.id}
                name={pok.name}
                tipo={pok.Types}
                image={pok.image}
              />
            );
          })}
    </div>
  );
};

export default Cards;
