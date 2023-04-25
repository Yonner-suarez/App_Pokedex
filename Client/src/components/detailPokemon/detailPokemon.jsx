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
    <div>
      {detailPok.name ? (
        <div>
          <h1>NAME |{detailPok.name}</h1>
          <h2>ID |{detailPok.id}</h2>
          <h2>VIDA |{detailPok.vida}</h2>
          <h2>ATAQUE |{detailPok.ataque}</h2>
          <h2>DEFENSA |{detailPok.defensa}</h2>
          <h2>VELOCIDAD |{detailPok.velocidad}</h2>
          <h2>ALTURA |{detailPok.altura}</h2>
          <h2>PESO |{detailPok.peso}</h2>

          <img src={detailPok.image} alt={detailPok.name} />
          {/* !! el signo de ? es muy
      importante para leer la info  */}
        </div>
      ) : null}

      {detailPok.tipo.map((tip) => {
        return <h2>{tip.name}</h2>;
      })}
    </div>
  );
};

export default DetailPokemmon;
