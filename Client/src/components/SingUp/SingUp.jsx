import { useState } from "react";
import style from "./SingUp.module.css";

const SingUp = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (event) => {
    const key = event.target.name,
      value = event.target.value;

    setUser({
      ...user,
      [key]: value,
    });
  };
  return (
    <div className={style.contenedor}>
      <div className={style.contform}>
        <form className={style.form}>
          <p>Create your account</p>
          <br />
          <input
            type="text"
            name="userName"
            value={user.userName}
            placeholder="User Name"
            onChange={onChange}
            className={style.input}
          />
          <br />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={onChange}
            className={style.input}
          />
          <br />
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            className={style.input}
          />
        </form>

        <button className={style.botonL}>Submit</button>
      </div>
    </div>
  );
};

export default SingUp;
