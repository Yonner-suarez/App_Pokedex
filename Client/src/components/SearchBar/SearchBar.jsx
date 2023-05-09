import style from "./searchbar.module.css";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  //uso un estado global para guardar la informacion a buscar
  const [busca, setBusca] = useState("");

  const handleC = (event) => {
    //esta funcion se ejecuta cuando cambiemos el valor del input seteando el estado local con el value del evento
    setBusca(event.target.value);
  };
  const submit = () => {
    //esta funcion se ejecuta cuando demos click al boton ejecutando la funion onSearch y pasando el valor a buscar, est funcion es recibida por props
    onSearch(busca);
  };

  return (
    <div className={style.contenedor}>
      <input
        onChange={handleC}
        type="search"
        value={busca}
        className={style.input}
        placeholder="Name or Id of your Pokemon"
      />
      <button onClick={submit} className={style.boton}>
        Search
      </button>
    </div>
  );
};
export default SearchBar;
