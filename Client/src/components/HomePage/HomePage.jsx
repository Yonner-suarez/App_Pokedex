import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    async function gett() {
      try {
        const respuesta = await axios.get("http://localhost:3001/pokemons");
        const { data } = respuesta;
        setAllPokemons(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    gett();
  }, []);

  return (
    <div>
      <h1>Aqui las cartas</h1>
      {allPokemons.map((pok) => {
        return (
          <Link to={`/detailPokemon/${pok.id}`}>
            <div>
              <h2>Name: {pok.name}</h2>
              <img src={pok?.image} alt={pok.name} />
              <h2>Tipos: {pok.tipo}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default HomePage;
