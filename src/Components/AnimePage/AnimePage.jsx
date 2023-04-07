import React from "react";
import styles from "../Pages/Top.module.css";
export default function AnimePage({ anime }) {
  return (
    <div className={styles.container}>
      <div className={styles.middleContainer}>
        <h3 className={styles.h3}>{anime.title}</h3>
        <p className={styles.description}>{`${anime.description
          .split(" ")
          .slice(0, 100)
          .join(" ")}...`}</p>
      </div>
      <img src={anime.image} className={styles.backgroundAnime} />
    </div>
  );
}
