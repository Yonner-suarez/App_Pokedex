import style from "./paginado.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  nextPage,
  previusPage,
  nextTenPages,
  previusPageTen,
} from "../../Redux/action";

const Paginado = ({ catidadPages }) => {
  const { numPage } = useSelector((state) => state);

  const dispatch = useDispatch();

  const next = () => {
    dispatch(nextPage());
  };

  const nextTen = () => {
    dispatch(nextTenPages());
  };
  const previus = () => {
    dispatch(previusPage());
  };

  const previusTen = () => {
    dispatch(previusPageTen());
  };
  return (
    <footer className={style.foot}>
      <button
        onClick={previusTen}
        className={style.next}
        disabled={numPage === 1 || numPage <= 10 ? true : false}
      >
        ⬅️
      </button>

      <button
        onClick={previus}
        className={style.next}
        disabled={numPage === 1 ? true : false}
      >
        Previus
      </button>
      <p>
        {numPage} OF {catidadPages}
      </p>
      <button
        onClick={next}
        className={style.next}
        disabled={numPage === catidadPages + 1 ? true : false}
      >
        Next
      </button>

      <button
        className={style.next}
        onClick={nextTen}
        disabled={
          numPage === catidadPages - 10 || numPage >= catidadPages - 10
            ? true
            : false
        }
      >
        ➡️
      </button>
    </footer>
  );
};

export default Paginado;
