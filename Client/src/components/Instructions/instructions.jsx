//este componente tien la repsosabilidad de dar al usuario una introduccion y acciones de las que puede disfrutar en la app

import style from "./instructions.module.css";
import { Link } from "react-router-dom";

const Instructions = () => {
  return (
    <div className={style.cont}>
      <div className={style.contlink}>
        <h2>About App</h2>
        <Link to="/homePage" style={{ textDecoration: "none" }}>
          <button className={style.link}>Home</button>
        </Link>
      </div>
      <p>
        This application tries to simulate a pokedex, in which you can save your
        favorite pokemons and create your own pokemons. In this app you can
        access the details of each pokemon, in the same way you can filter them.
      </p>
      <br />
      <p>
        If you want to only see the ones you created or also those that are
        already saved in your pokedex. You can search for your pokemons by their
        full name or by their id if you know which is the pokemon to look for.
        You will have the opportunity to order them by their attack or by name,
        in addition, bring only some pokemons of a certain type.
      </p>
      <br />
      <p>
        !What you´re waiting for to start this adventure?¡
        <br />
        <img
          src="https://th.bing.com/th/id/R.0bf6e45b8378d2ccaeeb4d5e8304a6d1?rik=bSJkwApB6QPmDg&pid=ImgRaw&r=0"
          alt=""
          className={style.promo}
        />
      </p>
      <br />
      <div className={style.divimg}>
        <img
          src="https://i0.wp.com/www.lacasadeel.net/wp-content/uploads/2021/12/10-curiosidades-de-Pokemon-que-quiza-no-conoces.jpg"
          alt=""
          className={style.img}
        />
      </div>
    </div>
  );
};

export default Instructions;
