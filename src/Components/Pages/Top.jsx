import React from "react";
import styles from "./Top.module.css";
export default function Top() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}></div>
      <div className={styles.container}>Container 2</div>
    </div>
  );
}
