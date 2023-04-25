import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import DetailPokemmon from "./components/detailPokemon/detailPokemon";
import LandingPage from "./components/landingPage/landingPage";
import HomePage from "./components/HomePage/HomePage";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const navigate = useNavigate();

  const [access, setAccess] = useState(false);

  useEffect(() => {
    !access && navigate("/");
  }, []);

  const handleChange = () => {
    navigate("/homePage");
  };

  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname !== "/" && <SearchBar />}
      <Routes>
        <Route path="/" element={<LandingPage navigate={handleChange} />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/DetailPokemon/:id" element={<DetailPokemmon />} />
      </Routes>
    </div>
  );
}

export default App;
