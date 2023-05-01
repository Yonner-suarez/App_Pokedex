import style from "./detail.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

const DetailPokemmon = () => {
  const { id } = useParams();

  const [detailPok, setDetailPok] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/pokemons/${id}`).then(({ data }) => {
      if (data) {
        setDetailPok(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
  }, [id]);

  return (
    <div>
      {detailPok.map((pok) => {
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
              <img src={pok.image} alt={pok.name} />
            </div>
            <div className={style.contenedor3}>
              <h4>VELOCIDAD |{pok.velocidad}</h4>

              <h4>ALTURA |{pok.altura}</h4>
              <h4>VIDA |{pok.vida}</h4>
              <h4>PESO |{pok.peso}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailPokemmon;
