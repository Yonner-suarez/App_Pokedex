import style from "./detail.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

const DetailPokemmon = () => {
  const { id } = useParams();

  const [detailPok, setDetailPok] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/pokemons/${id}`).then(({ data }) => {
      console.log(data);
      if (data.name) {
        setDetailPok(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
  }, [id]);

  return (
    <div className={style.contenedor}>
      {detailPok.name ? (
        <div className={style.contenedor1}>
          <h4>ID |{detailPok.id}</h4>
          <h4>NAME |{detailPok.name}</h4>
          <h4>ATAQUE |{detailPok.ataque}</h4>
          <h4>DEFENSA |{detailPok.defensa}</h4>

          {/* !! el signo de ? es muy
      importante para leer la info  */}
          {detailPok.tipo.map((tip) => {
            const { name } = tip.type;
            return <h4>Tipo: {name}</h4>;
          })}
        </div>
      ) : null}
      <div className={style.contenedor2}>
        <img src={detailPok.image} alt={detailPok.name} />
      </div>
      <div className={style.contenedor3}>
        <h4>VELOCIDAD |{detailPok.velocidad}</h4>

        <h4>ALTURA |{detailPok.altura}</h4>
        <h4>VIDA |{detailPok.vida}</h4>
        <h4>PESO |{detailPok.peso}</h4>
      </div>
    </div>
  );
};

export default DetailPokemmon;
