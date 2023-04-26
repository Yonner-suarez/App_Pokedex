import style from "./navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { search } from "../../Redux/action";

const NavBar = () => {
  const dispatch = useDispatch();

  const onSearch = async (busca) => {
    let number = Number(busca);

    try {
      if (!number) {
        const resp = await axios.get(
          `http://localhost:3001/pokemons?name=${busca}`
        );
        const { data } = resp;
        console.log(data);
        dispatch(search(data));
      } else {
        const resp = await axios.get(`http://localhost:3001/pokemons/${busca}`);
        const { data } = resp;
        dispatch(search(data));
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <SearchBar onSearch={onSearch} />

      <Link to="/Add">
        <button className={style.boton}>Create your Pokemon</button>
      </Link>
    </div>
  );
};
export default NavBar;
