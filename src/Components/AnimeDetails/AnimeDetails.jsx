import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimeDetails } from "../../backend/api";
import { ArrowBack } from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import CustomModal from "../Carousels/CustomModal";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";

import style from "./AnimeDetails.module.css";
export default function AnimeDetails() {
  const { animeId } = useParams(); // retrieve the anime ID from the URL
  const [anime, setAnime] = useState(null); // state to store the anime details
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // fetch the anime details from the Jikan API when the component mounts
    getAnimeDetails(animeId).then((data) => {
      setAnime(data.data);
    });
  }, [animeId]);

  if (!anime) {
    return <div></div>;
  }

  return (
    <div className={style.container} >
      <CustomModal open={open} onClose={handleClose} anime={anime} ></CustomModal>
      <IconButton
        sx={{
          width: "50px",
          height: "50px",
          position: "absolute",
          bottom: "0",
          right: "0",
          margin: "50px",
          color: "white",
          transform: "scale(1.8)",
          zIndex: "600",
        }}
        onClick={() => {
          console.log("clicked");
          handleOpen();
        }}
      >
        <PlaylistAddCircleIcon></PlaylistAddCircleIcon>
      </IconButton>
      <img
        src={anime["images"]["jpg"]["image_url"]}
        alt={"loading"}
        className={style.backgroundAnime}
      />
      <Button
        onClick={() => window.history.back()}
        className={style.backButton}
        sx={{
          color: "white",
          zIndex: "600",
        }}
      >
        <ArrowBack className={style.buttonColor} />
      </Button>
      <div className={style.middleContainer}>
        <div className={style.rowHeaderContainer}>
          <h1>{anime.title}</h1>
          <p className={style.genreTitle}>{anime["genres"][0]["name"]}</p>
        </div>
        <div className={style.rowMiddle}>
          <img
            src={anime["images"]["jpg"]["image_url"]}
            alt={"loading"}
            className={style.middleImage}
          />
          <div className={style.descriptionCol}>
            <h3 className={style.descriptionTitle}> Description</h3>
            <p className={style.description}>{anime.synopsis}</p>
            <div className={style.otherInfomation}>
              <p>
                {" "}
                <span>Scores: </span>
                {anime.score}
              </p>
              <p>
                <span>Rating: </span>
                {anime.rating}
              </p>
              <p>
                <span>Duration: </span>
                {anime.duration}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
