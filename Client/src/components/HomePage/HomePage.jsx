import style from "./homepage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../cards/Cards";
import { filterPokemons, getPokemons, order } from "../../Redux/action";
import Paginado from "../Paginado/Paginado";
import { useState } from "react";
import { reset } from "../../Redux/action";

const HomePage = () => {
  const [filter, setFilter] = useState(false);

  const { pokemonsAll, numPage, types, copyPokemonsAll } = useSelector(
    (state) => state
  );

  let inicio = (numPage - 1) * 12,
    hasta = numPage * 12;

  let catidadPages = Math.floor(pokemonsAll.length / 12);

  let viewPokemons = pokemonsAll.slice(inicio, hasta);

  let catidadPages1 = Math.floor(copyPokemonsAll.length / 12);

  let viewPokemons1 = copyPokemonsAll.slice(inicio, hasta);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  const onChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch(order(value));
  };

  const selectFilter = (event) => {
    event.preventDefault();

    dispatch(filterPokemons(event.target.value));
    setFilter(true);
  };

  const resetPoks = (event) => {
    event.preventDefault();
    dispatch(reset());
  };

  return (
    <div>
      <h1>Here your Pokedex</h1>
      <select
        name="tipo"
        defaultValue={"DEFAULT"}
        onChange={onChange}
        className={style.select}
      >
        <option value="DEFAULT" disable="true">
          Select Order
        </option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
      <select
        name="filter"
        defaultValue={"DEFAULT"}
        onChange={selectFilter}
        className={style.select}
      >
        <option value="DEFAULT" disable="true">
          Select Filter
        </option>
        {types.map((tipo) => {
          return <option value={tipo.name}>{tipo.name}</option>;
        })}
      </select>
      <button onClick={resetPoks} className={style.reset}>
        Reset
      </button>

      <Cards allPokemons={filter ? viewPokemons1 : viewPokemons} />
      <Paginado catidadPages={catidadPages} />
    </div>
  );
};

export default HomePage;
