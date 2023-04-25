import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../Redux/action";

const Form = ({ postPok }) => {
  const dispatch = useDispatch();

  const { types } = useSelector((state) => state);

  const [newPok, setNewPok] = useState({
    name: "",
    image: "",
    vida: 0,
    ataque: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipo: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const handleOnChange = (event) => {
    const key = event.target.name,
      value = event.target.value;

    setNewPok({
      ...newPok,
      [key]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postPok(newPok);
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <br />
      <div>
        {/* <img
          src="https://1000marken.net/wp-content/uploads/2021/01/Pokemon-logo.svg"
          alt=""
        /> */}
      </div>
      <p>Here you can create your Pokemon</p>
      <br />
      <br />
      <label>
        <span>Name:</span>
        <input
          type="text"
          name="name"
          value={newPok.name}
          onChange={handleOnChange}
        />
        <br />
        <span></span>
      </label>
      <label>
        <span>vida:</span>
        <input
          type="text"
          name="vida"
          value={newPok.vida}
          onChange={handleOnChange}
        />
        <br />
        <span></span>
      </label>
      <label>
        <span>Ataque:</span>
        <input
          type="text"
          name="ataque"
          value={newPok.ataque}
          onChange={handleOnChange}
        />
        <br />
        <span></span>
      </label>
      <label>
        <span>Defensa:</span>
        <input
          type="text"
          name="defensa"
          value={newPok.velocidad}
          onChange={handleOnChange}
        />
        <br />
        <span></span>
      </label>
      <label htmlFor="">
        <span>Velocidad:</span>
        <input
          type="text"
          name="velocidad"
          value={newPok.velocidad}
          onChange={handleOnChange}
        />
        <br />
        <span></span>
      </label>
      <label htmlFor="">
        <span>Altura:</span>
        <input
          type="text"
          name="altura"
          value={newPok.altura}
          onChange={handleOnChange}
        />
        <br />
        <span></span>
      </label>
      <label>
        <span>Peso:</span>
        <input
          type="text"
          name="peso"
          value={newPok.peso}
          onChange={handleOnChange}
        />
        <br />
        <span></span>
      </label>

      <div>
        {types.map((tipo) => {
          return (
            <div>
              <input
                type="checkbox"
                name={newPok.tipo}
                onChange={handleOnChange}
              />
              <span value={tipo.name}>{tipo.name}</span>
            </div>
          );
        })}
      </div>

      <br />
      <br />
      <label>
        <span>Link Image:</span>
        <input
          type="text"
          name="image"
          value={newPok.image}
          onChange={handleOnChange}
        />
        <br />
        <span></span>
      </label>
      <br />
      <br />
      <button type="submit">Create</button>
    </form>
  );
};
export default Form;
