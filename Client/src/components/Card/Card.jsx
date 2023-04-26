import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, name, image, tipo }) => {
  return (
    <div className={style.contenedor}>
      <Link to={`/detailPokemon/${id}`} className={style.link}>
        <h3>Name: {name}</h3>
        <h3>Tipos: {tipo}</h3>
        <div className={style.contenedor1}>
          <img src={image} alt={name} className={style.img} />
        </div>
      </Link>
    </div>
  );
};

export default Card;
