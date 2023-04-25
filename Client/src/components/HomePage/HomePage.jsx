import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
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
      <Cards allPokemons={allPokemons} />
    </div>
  );
};

export default HomePage;
