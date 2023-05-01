import style from "./form.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import validations from "./validations";

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
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    tipo: [],
  });

  const handleOnChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    let aux;
    if (event.target.value.includes(Number(event.target.value))) {
      aux = Number(event.target.value);
    }

    setNewPok({
      ...newPok,
      [key]: aux ? aux : value,
    });
    validations(
      {
        ...newPok,
        [key]: aux ? aux : value,
      },
      errors,
      setErrors
    );
  };

  const onCheck = (event) => {
    if (newPok.tipo.includes(event.target.value)) {
      newPok.tipo = newPok.tipo.filter((name) => name !== event.target.value);
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
          src={
            newPok.image
              ? newPok.image
              : "https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png"
          }
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
          <span className={style.controlador}>{errors.name}</span>
          <br />
        </label>
        <label>
          <span className={style.span}>vida: </span>

          <input
            type="range"
            name="vida"
            value={newPok.vida}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span className={style.controlador}>
            {errors.vida ? errors.vida : newPok.vida}
          </span>
          <br />
        </label>
        <label>
          <span className={style.span}>Ataque:</span>

          <input
            type="range"
            name="ataque"
            value={newPok.ataque}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span className={style.controlador}>
            {errors.ataque ? errors.ataque : newPok.ataque}
          </span>
          <br />
        </label>
        <label>
          <span className={style.span}>Defensa:</span>

          <input
            type="range"
            name="defensa"
            value={newPok.defensa}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span className={style.controlador}>
            {errors.defensa ? errors.defensa : newPok.defensa}
          </span>
          <br />
        </label>
        <label htmlFor="">
          <span className={style.span}>Velocidad:</span>

          <input
            type="range"
            name="velocidad"
            value={newPok.velocidad}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span className={style.controlador}>
            {errors.velocidad ? errors.velocidad : newPok.velocidad}
          </span>
          <br />
        </label>
        <label htmlFor="">
          <span className={style.span}>Altura:</span>

          <input
            type="range"
            name="altura"
            value={newPok.altura}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span className={style.controlador}>
            {errors.altura ? errors.altura : newPok.altura}
          </span>
          <br />
        </label>
        <label>
          <span className={style.span}> Peso: </span>

          <input
            type="range"
            name="peso"
            value={newPok.peso}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span className={style.controlador}>
            {errors.peso ? errors.peso : newPok.peso}
          </span>
          <br />
        </label>

        <label>
          <span className={style.span}>Link Image:</span>

          <input
            type="text"
            name="image"
            value={newPok.image}
            onChange={handleOnChange}
            className={style.input}
          />
          <br />
          <span className={style.controlador}>{errors.image}</span>
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
                  value={tipo.name}
                  id={tipo.id}
                  onChange={onCheck}
                />
                <span value={tipo.name}>{tipo.name}</span>
              </div>
            );
          })}
          <span className={style.controlador}>{errors.tipo}</span>
        </div>

        <button
          type="submit"
          disabled={
            errors.name ||
            errors.ataque ||
            errors.image ||
            errors.velocidad ||
            errors.defensa ||
            errors.vida ||
            errors.peso ||
            errors.altura ||
            newPok.tipo.length === 0
              ? true
              : false
          }
          className={style.boton}
        >
          Create
        </button>
      </form>
    </div>
  );
};
export default Form;
