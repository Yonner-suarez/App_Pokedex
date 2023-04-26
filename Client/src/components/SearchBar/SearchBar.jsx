import style from "./searchbar.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const SearchBar = ({ onSearch }) => {
  const [busca, setBusca] = useState("");
  const { pokemonsAll } = useSelector((state) => state);

  const handleC = (event) => {
    setBusca(event.target.value);
  };
  const submit = () => {
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
