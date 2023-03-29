import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import buttonStyle from "../AnimeDetails/AnimeDetails.module.css";
import { ArrowBack } from "@material-ui/icons";
import style from "./WatchList.module.css";
import WatchListCard from "./WatchListCard";
export default function WatchList() {
  return (
    <div>
      <Button
        onClick={() => window.history.back()}
        className={buttonStyle.backButton}
        sx={{
          color: "white",
          zIndex: "600",
        }}
      >
        <ArrowBack className={buttonStyle.buttonColor} />
      </Button>
      <div className={style.container}>
        <div className={style.listWrap}>
          <h3>To Watch</h3>
          <div className={style.roundBorder}>
            <div className={style.rowHeader}>
              <div className={style.cover}></div>
              <div>Title</div>
              <div>Switch To</div>
            </div>
            <WatchListCard
              image={"https://cdn.myanimelist.net/images/anime/1988/113791.jpg"}
              title={"Jutjustu Kaisen"}
            />
          </div>
        </div>
        <div className={style.listWrap}>
          <h3>Watching</h3>
          <div className={style.roundBorder}>
            <div className={style.rowHeader}>
              <div className={style.cover}></div>
              <div>Title</div>
              <div>Switch To</div>
            </div>
            <WatchListCard
              image={"https://cdn.myanimelist.net/images/anime/1988/113791.jpg"}
              title={"Jutjustu Kaisen"}
            />
          </div>
        </div>
        <div className={style.listWrap}>
          <h3>Completed</h3>
          <div className={style.roundBorder}>
            <div className={style.rowHeader}>
              <div className={style.cover}></div>
              <div>Title</div>
              <div>Switch To</div>
            </div>
            <WatchListCard
              image={"https://cdn.myanimelist.net/images/anime/1988/113791.jpg"}
              title={"Jutjustu Kaisen"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
