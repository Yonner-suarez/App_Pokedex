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
          src={
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1c102812-9165-4c99-86f2-48444a3cbc93/db09lz2-eb22b4e2-1ca6-4c77-81e7-c5f66d71de1b.png/v1/fill/w_670,h_1192,q_70,strp/pokemon_phone_wallpaper_by_fuwoops_db09lz2-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzFjMTAyODEyLTkxNjUtNGM5OS04NmYyLTQ4NDQ0YTNjYmM5M1wvZGIwOWx6Mi1lYjIyYjRlMi0xY2E2LTRjNzctODFlNy1jNWY2NmQ3MWRlMWIucG5nIiwid2lkdGgiOiI8PTcyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.ZdQsbcXc4hVRb-JKsW1oVy51Ib7D2tBL_wL1_l98Sfs"
          }
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
      </div>
      <div className={style.contform}>
        <form className={style.form}>
          <br />
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
        <img
          src="https://th.bing.com/th/id/R.b75d698d329102dccb937325541c8b8c?rik=hvXz%2bwSXUi2tTQ&pid=ImgRaw&r=0"
          alt=""
          onClick={() => login(log.userName, log.password)}
          className={style.boton}
        />
      </div>

      {/*cuando se hace click al boton se ejecuta la funcion login pasada por parametros a esta funcion se le pasa el userName y la password del estado local*/}
    </div>
  );
};

export default LandingPage;
