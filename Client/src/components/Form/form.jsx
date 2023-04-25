import { useState } from "react";
import { useSelector } from "react-redux";

const Form = ({ postPok }) => {
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

  const handleOnChange = (event) => {
    const key = event.target.name,
      value = event.target.value;

    setNewPok({
      ...newPok,
      [key]: value,
    });
  };

  const onCheck = (event) => {
    if (newPok.tipo.includes(event.target.value)) {
      newPok.tipo = newPok.tipo.filter((id) => id !== event.target.value);
      setNewPok({
        ...newPok,
        tipo: newPok.tipo,
      });
    } else {
      setNewPok({
        ...newPok,
        tipo: [...newPok.tipo, event.target.value],
      });
    }
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
      <br />
      <br />
      <label>
        <span>Link Image:</span>
        {console.log(types)}
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
      <div>
        {types.map((tipo) => {
          return (
            <div>
              <input
                type="checkbox"
                name={tipo.name}
                value={tipo.id}
                id={tipo.id}
                onChange={onCheck}
              />
              <span value={tipo.name}>{tipo.name}</span>
            </div>
          );
        })}
      </div>
      <button type="submit">Create</button>
    </form>
  );
};
export default Form;
