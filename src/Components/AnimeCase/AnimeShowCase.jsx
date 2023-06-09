import React from "react";
import styles from "./AnimeShowCase.module.css";
import { useNavigate } from "react-router-dom";

export default function AnimeShowCase() {
  const nav = useNavigate();

  const handleClick = (route) => {
    nav(route);
  };

  return (
    <div className={styles.grid}>
      <div onClick={() => handleClick(`/anime/49596`)}>
        <img
          src="https://images7.alphacoders.com/125/1259789.png"
          className={styles.animeImage}
        />
      </div>
      <div onClick={() => handleClick(`/anime/20583`)}>
        <img
          src="https://images7.alphacoders.com/727/727948.jpg"
          className={styles.animeImage}
        />
      </div>
    </div>
  );
}
