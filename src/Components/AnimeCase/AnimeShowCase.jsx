import React from "react";
import styles from "./AnimeShowCase.module.css";
export default function AnimeShowCase() {
  return (
    <div className={styles.grid}>
      <img
        src="https://images7.alphacoders.com/125/1259789.png"
        className={styles.animeImage}
      />
      <img
        src="https://images7.alphacoders.com/727/727948.jpg"
        className={styles.animeImage}
      />
    </div>
  );
}
