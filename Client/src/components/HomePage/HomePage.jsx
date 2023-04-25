import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../cards/Cards";
import { getPokemons, order } from "../../Redux/action";
import Paginado from "../Paginado/Paginado";

const HomePage = () => {
  const { pokemonsAll, numPage } = useSelector((state) => state);

  let inicio = (numPage - 1) * 12,
    hasta = numPage * 12;

  let catidadPages = Math.floor(pokemonsAll.length / 12);

  let viewPokemons = pokemonsAll.slice(inicio, hasta);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  const onChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch(order(value));
  };

  return (
    <div>
      <h1>Here your Pokedex</h1>
      <select name="tipo" defaultValue={"DEFAULT"} onChange={onChange}>
        <option value="DEFAULT" disable="true">
          Select Order
        </option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
      <select name="filter" defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disable="true">
          Select Filter
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">unknown</option>
      </select>
      <Cards allPokemons={viewPokemons} />
      <Paginado catidadPages={catidadPages} />
    </div>
  );
};

export default HomePage;
