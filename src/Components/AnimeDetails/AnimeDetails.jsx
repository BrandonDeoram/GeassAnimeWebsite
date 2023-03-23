import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimeDetails } from "../../backend/api";
import { ArrowBack } from "@material-ui/icons";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import style from "./AnimeDetails.module.css";
export default function AnimeDetails() {
  const { animeId } = useParams(); // retrieve the anime ID from the URL
  const [anime, setAnime] = useState(null); // state to store the anime details

  useEffect(() => {
    // fetch the anime details from the Jikan API when the component mounts
    getAnimeDetails(animeId).then((data) => {
      setAnime(data.data);
    });
  }, [animeId]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button
        className={style.backButton}
        sx={{
          color: "white",
        }}
      >
        <ArrowBack className={style.buttonColor} />
      </Button>
      <h1>{anime.title}</h1>
      <img src={anime.image_url} alt={anime.title} />
      <div>{anime.synopsis}</div>
    </div>
  );
}
