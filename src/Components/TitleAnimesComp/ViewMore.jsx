import React from "react";
import { Button } from "@mui/material";
import style from "./TitlesAnimes.module.css";
import { ArrowBack } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
export default function ViewMore() {
  const location = useLocation();
  console.log(location);
  const { title, animes } = location.state;
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
        <p className={style.titlesAnimes}>Latest Anime</p>
        {title}
        <div className={style.grid}></div>
      </div>
    </div>
  );
}
