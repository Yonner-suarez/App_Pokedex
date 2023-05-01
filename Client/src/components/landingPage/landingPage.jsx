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
          src={
            "https://th.bing.com/th/id/R.570fcab842fdd7d199a526f2a1e5f0f6?rik=eTEtfQ%2by0pFa2Q&pid=ImgRaw&r=0"
          }
          alt=""
          className={style.image}
        />
      </div>

      <img
        src="https://th.bing.com/th/id/R.b75d698d329102dccb937325541c8b8c?rik=hvXz%2bwSXUi2tTQ&pid=ImgRaw&r=0"
        alt=""
        onClick={navigate}
        className={style.boton}
      />
    </div>
  );
};

export default LandingPage;
