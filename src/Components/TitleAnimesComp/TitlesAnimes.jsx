import React from "react";
import styles from "./TitlesAnimes.module.css";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import CustomModal from "../Carousels/CustomModal";
import { useContext } from "react";
import TitleAnimeContext from "../../providers/TitleAnimeContext";
import { useNavigate } from "react-router-dom";

export default function TitlesAnimes({ title, animes }) {
  const limitedAnimes = animes.slice(0, 8);
  const [open, setOpen] = useState(false);
  const [currentAnime, setCurrentAnime] = useState(null);
  const [newTitle, setTitle] = useState("");
  const { settingTitleAnime, settingAnimes } = useContext(TitleAnimeContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(title.replaceAll(" ", "-").toLowerCase());
    console.log(newTitle);
  }, [title, newTitle]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewMore = () => {
    console.log("EXECUTED");
    console.log(title);
    settingTitleAnime(title);
    settingAnimes(animes);
    navigate(`/${newTitle}`); // Navigate to the ViewMore component
  };

  return (
    <section className={styles.section}>
      <div className={styles.rowHeader}>
        <p className={styles.titlesAnimes}>{title}</p>
        <Button className={styles.backButton} onClick={handleViewMore}>
          View more
        </Button>
      </div>
      <div className={styles.grid}>
        {limitedAnimes.map((anime, index) => (
          <div className={styles.card} key={index}>
            <Link to={`/anime/${anime.mal_id}`} className={styles.cardImage}>
              <img src={anime["images"]["jpg"]["image_url"]} alt={"loading"} />
              <div className={styles.title}>{anime["title"]}</div>
            </Link>
            <IconButton
              aria-label="delete"
              sx={{
                width: "50px",
                color: "white",
                zIndex: 200,
                position: "absolute",
                float: "right",
                right: 0,
                top: 0,
                ":hover": {
                  color: "#a5965c",
                },
              }}
              onClick={() => {
                console.log(anime.mal_id);
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
    </section>
  );
}
