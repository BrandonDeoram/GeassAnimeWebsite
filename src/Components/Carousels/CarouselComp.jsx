import React, { useEffect, useState } from 'react'
import { getTopAnimes } from '../../backend/api'
import styles from "./Carousels.module.css";
import LargeAnimeCard from '../Cards/LargeAnimeCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

//Takes an AnimeList and turns it into a card 
export default function CarouselComp({ props }) {
    let animes = props;
    // anime['images']['jpg']['image_url']
    /* {anime['title']} */
    return (
        <Splide aria-label="My Favorite Images" className={styles.carouselContainer} options={{
            breakpoints: {
                700: {
                    perPage: 3,
                    gap: 5
                },
                1000: {
                    perPage: 5,
                    gap: 20
                },
                1200: {
                    perPage: 7,
                    gap: 20
                },
                1400: {
                    perPage: 8,
                    gap: 10
                },
                2000: {
                    perPage: 10,
                    gap: 10,
                },
            },

            rewind: true,
        }} >

            {animes.map((anime, id) => {
                return <SplideSlide key={id}>

                    <div className="card">
                        <a href={`/anime/${anime.mal_id}`}>
                            <img src={anime['images']['jpg']['image_url']} />

                            <div className="container2" >
                                {anime['title']}
                            </div>
                        </a>
                        <IconButton aria-label="delete" sx={{
                            width: 50,
                            color: 'white',
                            zIndex: 200,
                            position: 'absolute',
                            right: '0%',
                        }}>
                            <LibraryAddIcon />
                        </IconButton>
                    </div>


                </SplideSlide>

            })}

        </Splide>
    );
}