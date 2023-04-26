import style from "./form.module.css";
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
    <div className={style.formulario}>
      <div className={style.contenedorImg}>
        <h2>Here you can create your Pokemon</h2>
        <img
          src="https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png"
          alt=""
          className={style.img}
        />
      </div>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Let´s Go</h2>
        <label>
          <span className={style.span}>Name: </span>

          <input
            type="text"
            name="name"
            value={newPok.name}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span></span>
          <br />
        </label>
        <label>
          <span className={style.span}>vida: </span>

          <input
            type="text"
            name="vida"
            value={newPok.vida}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span></span>
          <br />
        </label>
        <label>
          <span className={style.span}>Ataque:</span>

          <input
            type="text"
            name="ataque"
            value={newPok.ataque}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span></span>
          <br />
        </label>
        <label>
          <span className={style.span}>Defensa:</span>

          <input
            type="text"
            name="defensa"
            value={newPok.velocidad}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span></span>
          <br />
        </label>
        <label htmlFor="">
          <span className={style.span}>Velocidad:</span>

          <input
            type="text"
            name="velocidad"
            value={newPok.velocidad}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span></span>
          <br />
        </label>
        <label htmlFor="">
          <span className={style.span}>Altura:</span>

          <input
            type="text"
            name="altura"
            value={newPok.altura}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span></span>
          <br />
        </label>
        <label>
          <span className={style.span}> Peso: </span>

          <input
            type="text"
            name="peso"
            value={newPok.peso}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span></span>
          <br />
        </label>

        <label>
          <span className={style.span}>Link Image:</span>

          {console.log(types)}
          <input
            type="text"
            name="image"
            value={newPok.image}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span></span>
          <br />
        </label>

        <div className={style.checkbox}>
          <h5>Tipos</h5>
          {types.map((tipo) => {
            return (
              <div className={style.checkbox1}>
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
        <button type="submit" className={style.boton}>
          Create
        </button>
      </form>
    </div>
  );
};
export default Form;
