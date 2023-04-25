import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ allPokemons }) => {
  return (
    <div className={style.contenedor}>
      {allPokemons.map((pok) => {
        return (
          <Card
            key={pok.id}
            id={pok.id}
            name={pok.name}
            image={pok.image}
            tipo={pok.tipo}
          />
        );
      })}
    </div>
  );
};

export default Cards;
