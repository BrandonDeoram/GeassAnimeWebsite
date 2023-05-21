import React from "react";
import styles from "./TitlesAnimes.module.css";
import { Button } from "@mui/material";
export default function TitlesAnimes({ title, animes }) {
  const limitedAnimes = animes.slice(0, 16);
  return (
    <section className={styles.section}>
      <div className={styles.rowHeader}>
        <p className={styles.titlesAnimes}>{title}</p>
        <Button className={styles.backButton}>View more</Button>
      </div>
      <div className={styles.grid}>
        {limitedAnimes.map((anime, index) => (
          <div className={styles.animeCard} key={index}>
            <img src={anime["images"]["jpg"]["image_url"]} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}
