import style from "./detail.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const DetailPokemmon = () => {
  const { id } = useParams();

  const [detailPok, setDetailPok] = useState([]);

  useEffect(() => {
    axios
      .get(`/pokemons/${id}`)
      .then(({ data }) => data && setDetailPok(data))
      .catch((error) => alert(error.message));
  }, [id]);

  return (
    <div className={style.fullCont}>
      {!detailPok.length ? (
        <img
          src="https://c.tenor.com/XjV2_OLEE_EAAAAC/spin-loading.gif"
          alt=""
          className={style.img}
        />
      ) : (
        detailPok.map((pok) => {
          return (
            <div className={style.contenedor}>
              <div className={style.contenedor1}>
                <h4>ID |{pok.idPok ? pok.idPok : pok.id}</h4>
                <h4>NAME |{pok.name}</h4>
                <h4>ATAQUE |{pok.ataque}</h4>
                <h4>DEFENSA |{pok.defensa}</h4>
                <h4>Tipo:</h4>
                {pok.Types.map((tip) => {
                  return <h4>{tip.name}</h4>;
                })}
              </div>
              <div className={style.contenedor2}>
                <img
                  src={
                    pok.image
                      ? pok.image
                      : "https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png"
                  }
                  alt={pok.name}
                />
              </div>
              <div className={style.contenedor3}>
                <h4>VELOCIDAD |{pok.velocidad}</h4>

                <h4>ALTURA |{pok.altura}</h4>
                <h4>VIDA |{pok.vida}</h4>
                <h4>PESO |{pok.peso}</h4>
              </div>
            </div>
          );
        })
      )}
      <div className={style.div}>
        <Link to="/homePage" style={{ textDecoration: "none" }}>
          <button className={style.link}>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default DetailPokemmon;
