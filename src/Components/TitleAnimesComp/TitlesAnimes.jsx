import React from "react";
import styles from "./TitlesAnimes.module.css";
import { Button } from "@mui/material";
export default function TitlesAnimes() {
  return (
    <section>
      <div className={styles.rowHeader}>
        <p className={styles.titlesAnimes}>TitlesAnimes</p>
        <Button className={styles.backButton}>View more</Button>

      </div>
    </section>
  );
}
