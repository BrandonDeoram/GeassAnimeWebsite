import React from "react";
import styles from "./TitleWCarousel.module.css";
import CarouselComp from "../Carousels/CarouselComp";
export default function TitleWCarousel({ title, animes }) {
    return <>
        <div className={styles.container}>
            <h1 className={styles.backTitle}>{title}</h1>
            <h2 className={styles.title}>{title}</h2>
            <CarouselComp props={animes}></CarouselComp>
        </div>
    </>
}