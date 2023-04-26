import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ allPokemons }) => {
  const { search } = useSelector((state) => state);
  return (
    <div className={style.contenedor}>
      {allPokemons.map((pok) => {
        return (
          <Card
            key={pok.id}
            id={pok.id}
            name={pok.name}
            tipo={pok.tipo}
            image={pok.image}
          />
        );
      })}
    </div>
  );
};

export default Cards;
