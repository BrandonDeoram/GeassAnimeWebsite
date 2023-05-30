import React from "react";
import { Button } from "@mui/material";
import style from "./TitlesAnimes.module.css";
import { ArrowBack } from "@material-ui/icons";
import { useContext } from "react";
import TitleAnimeContext from "../../providers/TitleAnimeContext";
export default function ViewMore(){
  const { title, animes } = useContext(TitleAnimeContext);
  console.log(title);
  return (
    <div>
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
      <div className={style.container}>
        <p className={style.titlesAnimes}>{title}</p>
        {title}
        <div className={style.grid}></div>
      </div>
    </div>
  );
}
