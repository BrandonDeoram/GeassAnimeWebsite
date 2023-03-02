import React from 'react';
import "./Cards.css";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styles from "../Cards/Cards.css"
export default function LargeAnimeCard() {
    return (
        <SplideSlide>
            <div className={styles.card}>
                <img src='https://cdn.myanimelist.net/images/anime/1170/124312.jpg' />
                <div className={styles.container} >
                    Attack on Titan
                </div>
            </div>
        </SplideSlide>

    );
}