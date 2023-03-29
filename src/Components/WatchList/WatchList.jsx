import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import buttonStyle from "../AnimeDetails/AnimeDetails.module.css";
import { ArrowBack } from "@material-ui/icons";
import style from "./WatchList.module.css";
import WatchListCard from "./WatchListCard";
import { getWatchList } from "../../backend/api";
import { useEffect, useState } from "react";
export default function WatchList() {
  const [toWatch, setToWatch] = useState([]);
  const [watching, setWatching] = useState([]);
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    getWatchList(token).then((data) => {
      setToWatch(data["toWatch"]);
      setWatching(data["watching"]);
      setCompleted(data["completed"]);
      console.log("re-run");
    });
  }, []);
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
            {toWatch.map((anime, id) => {
              return <WatchListCard anime={anime} key={id}></WatchListCard>;
            })}
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
            {watching.map((anime, id) => {
           
              return <WatchListCard anime={anime} key={id}></WatchListCard>;
            })}
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
            {completed.map((anime, id) => {
          
              return <WatchListCard anime={anime} key={id}></WatchListCard>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
