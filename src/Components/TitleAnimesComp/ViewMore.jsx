import React from "react";
import { Button } from "@mui/material";
import style from "./TitlesAnimes.module.css";
import { ArrowBack } from "@material-ui/icons";
import { useContext } from "react";
import TitleAnimeContext from "../../providers/TitleAnimeContext";
import { Link } from "react-router-dom";
export default function ViewMore() {
  const { titleAnime, provAnimes } = useContext(TitleAnimeContext);
  console.log("PRINTING: ", provAnimes);
  return (
    <div>
      <Button
        onClick={() => window.history.back()}
        className={style.back}
        sx={{
          color: "white",
          zIndex: "600",
        }}
      >
        <ArrowBack className={style.buttonColor} />
      </Button>
      <div className={style.container}>
        <p className={style.viewMoreTitle}>{titleAnime}</p>
        <div className={style.grid}>
          {provAnimes.map((anime, index) => (
            <div className={style.card} key={index}>
              <Link to={`/anime/${anime.mal_id}`} className={style.cardImage}>
                <img
                  src={anime["images"]["jpg"]["image_url"]}
                  alt={"loading"}
                />
                <div className={style.title}>{anime["title"]}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
