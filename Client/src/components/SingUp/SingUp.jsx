import { useState } from "react";
import style from "./SingUp.module.css";
import { validate } from "./validate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const navigate = useNavigate();

  //uso el estado local paraa guardar la info del nuevo usuario a crear
  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  //me apoyo en un estado local de errores para manejar y controlar la informacion que es ingresada
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (event) => {
    //esta funcion es ejecutada cuando se cambia el value de los imputsseteando el estado local con los values del event y los names de envent tambien
    const key = event.target.name;
    const value = event.target.value;

    setUser({
      ...user,
      [key]: value,
    });

    //esta funcion es la encargada de rebisar que no haya errores en la informacion obtenida de los values
    validate({ ...user, [key]: value }, errors, setErrors);
  };

  const onSub = async (event) => {
    //esta funcion tiene la responsabilidad de hacer un peticion con axios del tipo POST a /user y con un segundo parametro que corresponde al estado local
    try {
      const resp = await axios.post("/user", user);

      alert(resp.data);
      event && navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={style.contenedor}>
      <div className={style.contform}>
        <form className={style.form} onSubmit={onSub}>
          <p>Create your Personage</p>
          <br />
          <input
            type="text"
            name="userName"
            value={user.userName}
            placeholder="User Name"
            onChange={onChange}
            className={style.input}
          />
          <span className={style.span}>{errors.userName}.</span>
          <br />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={onChange}
            className={style.input}
          />
          <span className={style.span}>{errors.password}.</span>
          <br />
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            className={style.input}
          />
          <span className={style.span}>{errors.confirmPassword}.</span>
          <div className={style.contboton}>
            <button className={style.botonL}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
