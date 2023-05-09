import style from "./landing.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTypes } from "../../Redux/action";
import { Link } from "react-router-dom";

const LandingPage = ({ login }) => {
  const dispatch = useDispatch();

  //este estado local esta para registrar la respuesta del usuario cuando hace un login
  const [log, setLog] = useState({
    userName: "",
    password: "",
  });

  //cuando se monta el componente Landinng se despacha ña accion getTypes y se vuelve a montar el componente cunado el dispatch cambie
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const onChange = (event) => {
    //esta funcion se ejecuta cada vez que el los impusts cambian su valor seteando el estado local con la informacion prevista por el usuario y ese estado es pasado a la funcion login.
    const key = event.target.name,
      value = event.target.value;

    setLog({
      ...log,
      [key]: value,
    });
  };
  return (
    <div className={style.contenedor}>
      <div className={style.imgcont}>
        <img
          src={"https://wallpaperaccess.com/full/3175040.jpg"}
          alt=""
          className={style.image}
        />
      </div>

      <div className={style.const}>
        <img
          src={
            "https://th.bing.com/th/id/R.bc8750fd1389936180e9b86aea819fe7?rik=q2ElpW0a8IyRlQ&pid=ImgRaw&r=0"
          }
          alt=""
          className={style.logo}
        />

        <div className={style.contform}>
          <form className={style.form}>
            <p>Welcome</p>
            <br />
            <input
              type="text"
              name="userName"
              value={log.userName}
              onChange={onChange}
              placeholder="User Name"
              className={style.input}
            />
            <br />
            <input
              type="text"
              name="password"
              value={log.password}
              onChange={onChange}
              placeholder="Password"
              className={style.input}
            />
          </form>
          <Link to="/singUp">
            <button className={style.botonL}>SingUp</button>
          </Link>
        </div>

        <img
          src="https://th.bing.com/th/id/R.b75d698d329102dccb937325541c8b8c?rik=hvXz%2bwSXUi2tTQ&pid=ImgRaw&r=0"
          alt=""
          onClick={() => login(log.userName, log.password)}
          className={style.boton}
        />
        {/*cuando se hace click al boton se ejecuta la funcion login pasada por parametros a esta funcion se le pasa el userName y la password del estado local*/}
      </div>
    </div>
  );
};

export default LandingPage;
