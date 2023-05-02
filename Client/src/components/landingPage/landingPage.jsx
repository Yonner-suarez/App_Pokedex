import style from "./landing.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTypes } from "../../Redux/action";

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

      <hr />

      <div className={style.const}>
        <img
          src={
            "https://th.bing.com/th/id/R.bc8750fd1389936180e9b86aea819fe7?rik=q2ElpW0a8IyRlQ&pid=ImgRaw&r=0"
          }
          alt=""
          className={style.logo}
          onClick={navigate}
        />

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
