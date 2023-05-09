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
  //traigo del estado global las props siguiente para su uso:
  const { pokemonsAll, numPage, types, search, user } = useSelector(
    (state) => state
  );

  //creo las varibles donde indican el inicio y el final del corte de los pokemons por pagina
  let inicio = (numPage - 1) * 12,
    hasta = numPage * 12;

  //creo la variable que define la cantidad de paginas donde le divido la longitud de todos los pokemons respecto de la cantidad que se mostrará por pagina
  let cantidadPages = Math.floor(pokemonsAll.length / 12);

  // creo la variable donde hago el corte de todos los pokemons desde el inicio 0 hasta el final es decir 12
  let viewPokemons = pokemonsAll.slice(inicio, hasta);

  const dispatch = useDispatch();

  //cunado se monta el componente me pregunto si hay user.id hago el dispatch de la action getPokemons pasandole por paramentro el id del usuario y se va a volver a motar el componente cuando el id del user cambie, ademas seteo el estado del filtro en falso para que no haya algun tipo de error
  useEffect(() => {
    user.id && dispatch(getPokemons(user.id));
  }, [user.id]);

  const onChangeAtack = (event) => {
    //esta funcion se ejcutara cada vez que cambiemos el orden de ataque de los pokemons, despachará la accion orderAtak pasandole por parametro el value del evento
    const { value } = event.target;
    dispatch(orderAtack(value));
  };
  const onChangeAlf = (event) => {
    //esta funcion se ejcutara cada vez que cambiemos el orden alfabetico de los pokemons, despachará la accion orderAlfabetic pasandole por parametro el value del evento
    const { value } = event.target;
    dispatch(orderAlfabetic(value));
  };

  const selectFilter = (event) => {
    //esta funcion se ejcutara cada vez que cambiemos el filtrado por tipos de los pokemons, despachará la accion filterPokemons pasandole por parametro el value del evento
    const { value } = event.target;
    dispatch(filterPokemons(value));
  };

  const selectFilterBDD = (event) => {
    //esta funcion se ejcutara cada vez que cambiemos el filtrado de los pokemons respecto de si son de la api externa o los pokemons creados, despachará la accion filterForApiOrBdd pasandole por parametro el value del evento
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
