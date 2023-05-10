import { useState } from "react";
import style from "./SingUp.module.css";
import { validate } from "./validate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setUser({
      ...user,
      [key]: value,
    });

    validate({ ...user, [key]: value }, errors, setErrors);
  };

  const onSub = async (event) => {
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
