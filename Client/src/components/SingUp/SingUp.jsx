import style from "./SingUp.module.css";

const SingUp = () => {
  return (
    <div className={style.contenedor}>
      <div className={style.contform}>
        <form className={style.form}>
          <p>Create your account</p>
          <br />
          <input type="text" placeholder="User Name" className={style.input} />
          <br />
          <input type="text" placeholder="Password" className={style.input} />
          <br />
          <input
            type="text"
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
