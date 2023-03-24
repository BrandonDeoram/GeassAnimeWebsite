import React from "react";
import styles from "./Carousels.module.css";
import LargeAnimeCard from "../Cards/LargeAnimeCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { sendAnime } from "../../backend/api";
import cardStyles from "../Cards/Cards.module.css";
import { Link } from "react-router-dom";
//Takes an AnimeList and turns it into a card
export default function CarouselComp({ props }) {
  let animes = props;

  return (
    <Splide
      aria-label="My Favorite Images"
      className={styles.carouselContainer}
      options={{
        breakpoints: {
          700: {
            perPage: 3,
            gap: 5,
          },
          1000: {
            perPage: 5,
            gap: 20,
          },
          1200: {
            perPage: 7,
            gap: 20,
          },
          1400: {
            perPage: 8,
            gap: 10,
          },
          2000: {
            perPage: 10,
            gap: 10,
          },
          2500: {
            perPage: 10,
            gap: 10,
          },
        },

        rewind: true,
      }}
    >
      {animes.map((anime, id) => {
        return (
          <SplideSlide key={id}>
            <div className={cardStyles.card}>
              <Link to={`/anime/${anime.mal_id}`}>
                <img
                  src={anime["images"]["jpg"]["image_url"]}
                  alt={"loading"}
                />
                <div className={cardStyles.title}>{anime["title"]}</div>
              </Link>
              <IconButton
                aria-label="delete"
                sx={{
                  width: 50,
                  color: "white",
                  zIndex: 200,
                  position: "absolute",
                  right: "0%",
                }}
                onClick={() => {
                  console.log(anime.mal_id);
                  sendAnime(anime);
                }}
              >
                <LibraryAddIcon />
              </IconButton>
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
