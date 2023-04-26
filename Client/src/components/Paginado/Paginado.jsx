import style from "./paginado.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nextPage } from "../../Redux/action";

const Paginado = () => {
  const { numPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  const next = () => {
    dispatch(nextPage());
  };

  return (
    <footer>
      <button onClick={next} className={style.next}>
        Next
      </button>
    </footer>
  );
};

export default Paginado;
