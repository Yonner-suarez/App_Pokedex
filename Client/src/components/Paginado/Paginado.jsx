import style from "./paginado.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  nextPage,
  previusPage,
  nextTenPages,
  previusPageTen,
} from "../../Redux/action";

const Paginado = ({ catidadPages }) => {
  //el componente funcional recibe por parametro la cantidad de paginas que fue enviada desde el componente homePage

  //traigo del estado global la prop numPage para ser usada en este componente
  const { numPage } = useSelector((state) => state);

  const dispatch = useDispatch();

  const next = () => {
    //esta funcion se ejecutara cada vez que se haga click al boton next, hara un dispatch de la accion nextPage
    dispatch(nextPage());
  };

  const nextTen = () => {
    //esta funcion se ejecutara cada vez que se haga click al boton de flecha para avanzar diez pags, hara un dispatch de la accion nextTenPages
    dispatch(nextTenPages());
  };
  const previus = () => {
    //esta funcion se ejecutara cada vez que se haga click al boton previus, hara un dispatch de la accion previusPage
    dispatch(previusPage());
  };

  const previusTen = () => {
    //esta funcion se ejecutara cada vez que se haga click al boton de flecha para devolver diez pags, hara un dispatch de la accion previusPageTen
    dispatch(previusPageTen());
  };
  return (
    <footer className={style.foot}>
      <button
        onClick={previusTen}
        className={style.next}
        disabled={numPage === 1 || numPage <= 10 ? true : false}
      >
        {/*si el numero de pagina es igual a uno o menor o igual a 10 que el disabled sea true sino sea fasle */}
        ⬅️
      </button>

      <button
        onClick={previus}
        className={style.next}
        disabled={numPage === 1 ? true : false}
      >
        {/*si el numero de pagina es igual a uno disabled sea true sino sea fasle */}
        Previus
      </button>
      <p>
        {numPage} OF {catidadPages + 1}
        {/*renderizo el numero de pagina actual de la catidad de paginas total del paginado */}
      </p>
      <button
        onClick={next}
        className={style.next}
        disabled={numPage === catidadPages + 1 ? true : false}
      >
        {/*si el numero de pagina es igual a la cantidad de paginas +1  disabled sea true sino sea fasle */}
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
        {/*si el numero de pagina es igual a la cantidad de paginas - 10 o el numero de pagina mayor o igual a la cantidad de paginas -10  disabled sea true sino sea fasle */}
        ➡️
      </button>
    </footer>
  );
};

export default Paginado;
