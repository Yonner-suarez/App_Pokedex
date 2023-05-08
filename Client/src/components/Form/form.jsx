import style from "./form.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import validations from "./validations";
import { Link } from "react-router-dom";

const Form = ({ postPok }) => {
  //recibe la funcion que tendra la responsabilidad de hacer la peticion POST para agregar un pokemon
  //traigo del estado global la propiedades types y user
  const { types, user } = useSelector((state) => state);

  //creo un estado local que me servirá para almacenar la informacion que el usuario vaya ingresando en el formulario
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

  //creo otro estado local que me serivirá para manejar los errores que el usurio ingrese, estas validaciones se realizaran en tiempo real
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
    //esta funcion se ejecutara para cada input y reconocera los valores que el usuario ingrese de tal manera que hagan un set al estado local con los valores que el usurio decidio ingresar
    const key = event.target.name,
      value = event.target.value;

    //creo una variable auxiliar y me pregunto si el valor de evento es un numero si asi es lo guardo en la variable auxiliar para qque el estado global acepte como tipo de numero y no como string
    let aux;
    if (event.target.value.includes(Number(event.target.value))) {
      aux = Number(event.target.value);
    }

    setNewPok({
      ...newPok,
      //si hay aux guardeme como valor ese auxiliar (numero) sino guardeme el valor en string.
      [key]: aux ? aux : value,
    });

    //ejecuto la funcion de validación de los datos ingresados pasandole el seteo tal cual para evitar errores, ademas paso por paramentros el estado errors y el seteo del estado
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
    //para ingresar los valores de los tipos al que el usuario quiere relacionar su pokemon se jecuta esta funcion y me pregunto.....
    if (newPok.tipo.includes(event.target.value)) {
      //si la prop tipo de newPok incluye el valor del evento filtro para que no se repitan los nombre de los tipos a relacionar y no ocurra un error en el back o en la bdd
      newPok.tipo = newPok.tipo.filter((name) => name !== event.target.value);
      // seteo el estado local creando una copia del mismo pero donde la prop tipo sea igual al filtrado realizado
      setNewPok({
        ...newPok,
        tipo: newPok.tipo,
      });
    } else {
      //si no hay tipos en el estado local en su prop tipo hacemos el mismo procedimiento pero esta vez la igualamos a un array que contenga lo que ya tenia el tipo del estado local y ademas le agregamos el valor del evento
      setNewPok({
        ...newPok,
        tipo: [...newPok.tipo, event.target.value],
      });
    }
  };

  const handleSubmit = (event) => {
    //esta funcion se ejecutará al momento de hacer click en el boto del submit, ejecutando la funcion reibida por parametro pasando el estado local y el usurio que inicio secion
    event.preventDefault();
    postPok(newPok, user);
  };

  return (
    <div className={style.formulario}>
      <Link to="/homePage">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3240/3240685.png"
          alt=""
          className={style.link}
        />
      </Link>

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
        <h4 className={style.h4}>Let´s Go</h4>
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


        {/*para desabilitar el boton de submit y que el usuario no envie informacion que no corresponde valido si hay algun error en la props de errors, si hay errores el desabled es true si no hay errores será false*/}
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
