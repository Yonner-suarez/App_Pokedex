import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Card from "@/card";
import { useState } from "react";
import axios from "axios";
import { Routes } from "react-router-dom";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let [pok, setPok] = useState([]);

  const handleChange = () => {
    let urls;
    let promises;

    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=10`)
      .then((res) => {
        urls = res.data.results.map((dat) => dat.url);
        return urls;
      })
      .then((res) => {
        promises = res.map((url) => axios.get(url));
        return promises;
      })
      .then((promisesP) => {
        Promise.all(promisesP).then((resp) => {
          resp.forEach((resp) => {
            setPok({
              id: resp.data.id,
              name: resp.data.name,
              image: resp.data.sprites.other.dream_world.front_default,
              vida: resp.data.stats[0]?.base_stat,
              ataque: resp.data.stats[1]?.base_stat,
              defensa: resp.data.stats[2]?.base_stat,
              velocidad: resp.data.base_experience,
              altura: resp.data.height,
              peso: resp.data.weight,
              tipo: resp.data.types[0]?.type.name,
            });
          });
          console.log(pok);
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className={styles.main}>
      <div>
        <button onClick={handleChange}>pokemons</button>
      </div>
      <div>
        {/* {pok.map((p) => {
          return (
            <div className={styles.contenedor}>
              <h2 className={styles.name} key={p.id}>
                {p.name}
              </h2>
              <img
                src={p.sprites.other.dream_world.front_default}
                alt={p.name}
              />
              <h2 className={styles.name}>Ph: {p.stats[0]?.base_stat}</h2>
              <h2 className={styles.name}>Ataque: {p.stats[1]?.base_stat}</h2>
              <h2 className={styles.name}>Defensa:{p.stats[2]?.base_stat}</h2>
              <h2 className={styles.name}>Velocidad: {p.base_experience}</h2>
              <h2 className={styles.name}>Altura: {p.height}</h2>
              <h2 className={styles.name}>Pseo: {p.weight}</h2>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
