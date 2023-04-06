import React from "react";
import styles from "../Pages/Top.module.css";
export default function AnimePage() {
  return (
    <div className={styles.container}>
      <img
        src="https://i.kinja-img.com/gawker-media/image/upload/c8b7d39a00d62c26f4ec2f8fc9986cda.jpg"
        className={styles.backgroundAnime}
      />
      <div className={styles.middleContainer}>
        <h3 className={styles.h3}>Naruto</h3>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          adipisci suscipit necessitatibus cum est repudiandae hic eaque maiores
          vero, debitis ipsam modi accusantium inventore quisquam cupiditate
          quidem, iure autem quae. Asperiores dignissimos odit quas debitis
          facilis impedit veniam eaque adipisci. Quam asperiores porro minus,
          velit voluptas nulla debitis dolore recusandae possimus non. Enim,
          esse ducimus.
        </p>
      </div>
    </div>
  );
}
