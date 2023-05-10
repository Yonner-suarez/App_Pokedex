import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, name, image, tipo }) => {
  return (
    <div className={style.contenedor}>
      <Link to={`/detailPokemon/${id}`} className={style.link}>
        <div className={style.contenedor1}>
          <img
            src={
              image
                ? image
                : "https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png"
            }
            alt={name}
            className={style.img}
          />
        </div>
        <h3>{name}</h3>
        {tipo
          ? tipo.map((tip) => {
              return (
                <div className={style.tipos}>
                  <h5> {tip.name}</h5>
                </div>
              );
            })
          : null}
      </Link>
    </div>
  );
};

export default Card;
