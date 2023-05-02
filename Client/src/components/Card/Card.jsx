import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, name, image, tipo }) => {
  return (
    <div className={style.contenedor}>
      <Link to={`/detailPokemon/${id}`} className={style.link}>
        <div className={style.contenedor1}>
          <img src={image} alt={name} className={style.img} />
        </div>
        <h3>{name}</h3>
        <h3>Tipos:</h3>

        {tipo.map((tip) => {
          return (
            <div className={style.tipos}>
              <h5> {tip.name}</h5>
            </div>
          );
        })}
      </Link>
    </div>
  );
};

export default Card;
