import style from "./landing.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTypes } from "../../Redux/action";
import { Link } from "react-router-dom";

const LandingPage = ({ navigate }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, []);
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
              placeholder="User Name"
              className={style.input}
            />
            <br />
            <input type="text" placeholder="Password" className={style.input} />
          </form>
          <Link to="/singUp">
            <button className={style.botonL}>SingUp</button>
          </Link>
        </div>

        <img
          src="https://th.bing.com/th/id/R.b75d698d329102dccb937325541c8b8c?rik=hvXz%2bwSXUi2tTQ&pid=ImgRaw&r=0"
          alt=""
          onClick={navigate}
          className={style.boton}
        />
      </div>
    </div>
  );
};

export default LandingPage;
