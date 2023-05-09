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

axios.defaults.baseURL = "http://localhost:3001";
//"https://apppokedex-production.up.railway.app";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //cada vez que se monte el componente app, se dirigirá a el landingPage
  useEffect(() => {
    navigate("/");
  }, []);

  const login = async (userName, password) => {
    //esta funcion recibe por parametros el userName y el password dados por el estado local del landingPage
    try {
      //con esos parametros hago una peticion al back de tipo GET para saber si ese usuario existe en la bdd si existe puede ingresar al homePage y despacha una accion getUser que guardará ese usuario en el estado global
      const accesso = await axios.get(
        `/user?userName=${userName}&password=${password}`
      );
      if (accesso.data.access) {
        console.log(accesso.data.access === true);
        navigate("/homePage");
        dispatch(getUser(accesso.data.user));
      } else {
        //si no existe ese personaje manda un mensaje al usario con el mensaje correspondiente
        alert("incorrect User");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const postPok = async (pok, { userName, password }) => {
    //esta funcion hara una peticion POST para añadir un pokemon a la bdd pasando el estado local del formulario y ademas el userName y la password del usuario guardadon en el estad global para poder relacionarse en el back
    try {
      const resp = await axios.post("/pokemons", { pok, userName, password });
      alert(resp.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const { pathname } = useLocation();
  //el pathname sirve para saver donde estoy parado en el enrutado de la app
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
