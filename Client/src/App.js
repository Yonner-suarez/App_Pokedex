import "./App.css";
import Form from "./components/Form/form";
import DetailPokemmon from "./components/detailPokemon/detailPokemon";
import LandingPage from "./components/landingPage/landingPage";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import Instructions from "./components/Instructions/instructions";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  const handleChange = () => {
    navigate("/homePage");
  };

  const postPok = async (pok) => {
    try {
      const resp = await axios.post("/pokemons", pok);
      alert(resp.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname === "/homePage" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage navigate={handleChange} />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/DetailPokemon/:id" element={<DetailPokemmon />} />
        <Route path="/Add" element={<Form postPok={postPok} />} />
        <Route path="/Instructions" element={<Instructions />} />
      </Routes>
    </div>
  );
}

export default App;
