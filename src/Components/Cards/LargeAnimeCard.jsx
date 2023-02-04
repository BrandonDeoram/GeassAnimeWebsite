import React from 'react';
import "./Cards.css";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
export default function LargeAnimeCard() {
    return (
        <SplideSlide>
            <div className="card">
                <img src='https://cdn.myanimelist.net/images/anime/1170/124312.jpg' />
                <div className="container2" >
                    hello
                </div>
            </div>
        </SplideSlide>

    );
}