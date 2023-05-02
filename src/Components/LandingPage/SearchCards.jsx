import React from "react";
import styles from "../LandingPage/LandingPage.module.css";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import cardStyle from "../Cards/Cards.module.css";
import CustomModal from "../Carousels/CustomModal";
import { useState } from "react";
export default function SearchCards({ searchResults }) {
  const [open, setOpen] = useState(false);
  const [currentAnime, setCurrentAnime] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.searchResContainer}>
      {searchResults.map((anime, id) => (
        <div className={cardStyle.card} key={id}>
          <a href={`/anime/${anime.mal_id}`}>
            <img src={anime["images"]["jpg"]["image_url"]} alt={"loading"} />
            <div className={cardStyle.title}>{anime["title"]}</div>
          </a>
          <IconButton
            aria-label="delete"
            sx={{
              width: 50,
              color: "white",
              zIndex: 200,
              position: "absolute",
              right: "0%",
              ":hover" : {
                color: "#a5965c",
              }
            }}
            onClick={() => {
              setCurrentAnime(anime);
              handleOpen(); // Open the modal when the button is clicked
            }}
          >
            <LibraryAddIcon />
          </IconButton>
        </div>
      ))}
      <CustomModal
        open={open}
        onClose={handleClose}
        anime={currentAnime}
      ></CustomModal>
    </div>
  );
}
