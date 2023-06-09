import style from "./homepage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../cards/Cards";
import {
  filterPokemons,
  getPokemons,
  orderAlfabetic,
  orderAtack,
  filterForApiOrBdd,
} from "../../Redux/action";
import Paginado from "../Paginado/Paginado";

const HomePage = () => {
  const { pokemonsAll, numPage, types, search, user } = useSelector(
    (state) => state
  );

  let inicio = (numPage - 1) * 12,
    hasta = numPage * 12;

  let cantidadPages = Math.floor(pokemonsAll.length / 12);

  let viewPokemons = pokemonsAll.slice(inicio, hasta);

  const dispatch = useDispatch();

  useEffect(() => {
    user.id && dispatch(getPokemons(user.id));
  }, [user.id]);

  const onChangeAtack = (event) => {
    const { value } = event.target;
    dispatch(orderAtack(value));
  };
  const onChangeAlf = (event) => {
    const { value } = event.target;
    dispatch(orderAlfabetic(value));
  };

  const selectFilter = (event) => {
    const { value } = event.target;
    dispatch(filterPokemons(value));
  };

  const selectFilterBDD = (event) => {
    const { value } = event.target;
    dispatch(filterForApiOrBdd(value));
  };

  return (
    <div className={style.allCont}>
      <select
        name="tipo"
        defaultValue={"DEFAULT"}
        onChange={onChangeAtack}
        className={style.select}
      >
        <option value="DEFAULT" disable="true" className={style.option}>
          Select Order For Atack
        </option>
        <option value="Ascendente" className={style.option}>
          Ascendente
        </option>
        <option value="Descendente" className={style.option}>
          Descendente
        </option>
      </select>
      <select
        name="tipo"
        defaultValue={"DEFAULT"}
        onChange={onChangeAlf}
        className={style.select}
      >
        <option value="DEFAULT" disable="true" className={style.option}>
          Select Order Alfabetic
        </option>
        <option value="Ascendente" className={style.option}>
          Ascendente
        </option>
        <option value="Descendente" className={style.option}>
          Descendente
        </option>
      </select>
      <select
        defaultValue={"DEFAULT"}
        onChange={selectFilter}
        className={style.select}
      >
        <option value="DEFAULT" disable="true" className={style.option}>
          Filter for Types
        </option>

        {types.map((tipo) => {
          return (
            <option value={tipo.name} className={style.option}>
              {tipo.name}
            </option>
          );
        })}
      </select>
      <select
        defaultValue={"DEFAULT"}
        onChange={selectFilterBDD}
        className={style.select}
      >
        <option value="DEFAULT" disable="true" className={style.option}>
          Filter for Origin
        </option>
        <option value="forApi" className={style.option}>
          For Api
        </option>

        <option value="dbb" className={style.option}>
          Created
        </option>
      </select>

      <Cards allPokemons={viewPokemons} search={search} />
      <Paginado catidadPages={cantidadPages} />
    </div>
  );
};

export default HomePage;
