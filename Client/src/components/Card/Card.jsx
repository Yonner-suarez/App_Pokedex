import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, name, image, tipo }) => {
  return (
    <div className={style.contenedor}>
      <Link to={`/detailPokemon/${id}`} className={style.links}>
        <h3>Name: {name}</h3>
        <img src={image} alt={name} className={style.img} />
        <h3>Tipos: {tipo}</h3>
      </Link>
    </div>
  );
};

export default Card;
