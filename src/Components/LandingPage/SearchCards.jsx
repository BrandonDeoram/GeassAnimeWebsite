import React from "react";
import styles from "../LandingPage/LandingPage.module.css";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { sendAnime } from "../../backend/api";
import cardStyle from "../Cards/Cards.module.css";
export default function SearchCards({ searchResults }) {
  console.log(searchResults);
  return (
    <div className={styles.searchResContainer}>
      {searchResults.map((anime) => (
        <div className={cardStyle.card}>
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
            }}
            onClick={() => {
              console.log(anime.mal_id);
              sendAnime(anime);
            }}
          >
            <LibraryAddIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
