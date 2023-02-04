import React, { useEffect, useState } from 'react'
import { getTopAnimes } from '../../backend/api'
import styles from "./Carousels.module.css";
import LargeAnimeCard from '../Cards/LargeAnimeCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
export default function CarouselComp() {
    const [topAnime, setTopAnime] = useState([]);

    useEffect(() => {
        getTopAnimes().then((res) => setTopAnime(res.data));

    }, [])
    return (
        <Splide aria-label="My Favorite Images" className={styles.carouselContainer} options={{
            perPage: 3,
            rewind: true,
            width: 800,
            gap: '1rem',
        }} >
            <SplideSlide >
                <div className="card">
                    <img src='https://cdn.myanimelist.net/images/anime/1170/124312.jpg' />
                    <div className="container2" >
                        hello
                    </div>
                </div>
            </SplideSlide>
            <SplideSlide>
                <div className="card">
                    <img src='https://cdn.myanimelist.net/images/anime/1170/124312.jpg' />
                    <div className="container2" >
                        hello
                    </div>
                </div>
            </SplideSlide><SplideSlide>
                <div className="card">
                    <img src='https://cdn.myanimelist.net/images/anime/1170/124312.jpg' />
                    <div className="container2" >
                        hello
                    </div>
                </div>
            </SplideSlide>


        </Splide>
    );
}

// {topAnime.map((anime, id) => {
//   return <li key={id}>{anime.title}</li>
// })}