import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <SearchBar />

      <Link to="/Add">
        <button>Crea tu Pokemon</button>
      </Link>
    </div>
  );
};
export default NavBar;
