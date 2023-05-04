import "./App.css";
import {
  Form,
  DetailPokemmon,
  HomePage,
  Instructions,
  LandingPage,
  NavBar,
  SingUp,
} from "./components/allComponents/allComponents";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { getUser } from "./Redux/action";
import { useDispatch } from "react-redux";

axios.defaults.baseURL ="https://apppokedex-production.up.railway.app/";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  const login = async (userName, password) => {
    try {
      const accesso = await axios.get(
        `/user?userName=${userName}&password=${password}`
      );
      if (accesso.data.access) {
        navigate("/homePage");
        dispatch(getUser(accesso.data.user));
      } else {
        alert("incorrect User");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const postPok = async (pok, { userName, password }) => {
    try {
      const resp = await axios.post("/pokemons", { pok, userName, password });
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
        <Route path="/" element={<LandingPage login={login} />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/DetailPokemon/:id" element={<DetailPokemmon />} />
        <Route path="/Add" element={<Form postPok={postPok} />} />
        <Route path="/Instructions" element={<Instructions />} />
        <Route path="/SingUp" element={<SingUp />} />
      </Routes>
    </div>
  );
}

export default App;
