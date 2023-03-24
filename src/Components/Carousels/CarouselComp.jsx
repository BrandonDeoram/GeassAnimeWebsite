import React, { useState } from "react";
import styles from "./Carousels.module.css";
import LargeAnimeCard from "../Cards/LargeAnimeCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { sendAnime } from "../../backend/api";
import cardStyles from "../Cards/Cards.module.css";
import { Link } from "react-router-dom";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function CarouselComp({ props }) {
  let animes = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
                    // sendAnime(anime);
                    handleOpen(); // Open the modal when the button is clicked
                  }}
                >
                  <LibraryAddIcon />
                </IconButton>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>

      <Modal
        open={open}
        onClose={handleClose}
        onClick={(event) => {
          console.log(event.target);
          console.log(event.currentTarget);
          if (event.target === event.currentTarget) {
            handleClose();
          }
        }}
        sx={{
          backgroundColor: "rgba(0,0,0,0.3)",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          height: "300px",
          width: "300px",
          // transform: "translate(-50%, -50%)",
          pointerEvents: "auto",
          margin: "auto",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3>Add to WatchList</h3>
          <div className={styles.columnModal}>
            <Button>toWatch</Button>
            <Button>Watching</Button>
            <Button>Completed</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
