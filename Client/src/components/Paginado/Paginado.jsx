import style from "./paginado.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, previusPage } from "../../Redux/action";

const Paginado = ({ catidadPages, catidadPages1 }) => {
  const { numPage } = useSelector((state) => state);

  const dispatch = useDispatch();

  const next = () => {
    dispatch(nextPage());
  };

  const previus = () => {
    dispatch(previusPage());
  };

  return (
    <footer>
      <button onClick={previus} className={style.next}>
        Previus
      </button>
      <button onClick={next} className={style.next}>
        Next
      </button>
    </footer>
  );
};

export default Paginado;
