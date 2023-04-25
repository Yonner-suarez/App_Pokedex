import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTypes } from "../../Redux/action";

const LandingPage = ({ navigate }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, []);
  return (
    <div>
      <h1>Welcome to Pokedex</h1>
      <button onClick={navigate}>ingresar</button>
    </div>
  );
};

export default LandingPage;
