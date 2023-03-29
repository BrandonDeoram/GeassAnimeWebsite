import React from "react";
import style from "./WatchList.module.css";
import SwitchMenu from "./SwitchMenu";
import { Link } from "react-router-dom";
export default function WatchListCard({ anime }) {
  return (
    <div className={style.listSection}>
      <img src={anime["images"]["jpg"]["image_url"]} alt={"loadig"} />

      <h3>
        <Link to={`/anime/${anime.mal_id}`} className={style.titleLink}>
          {anime.title}
        </Link>
      </h3>
      <SwitchMenu></SwitchMenu>
    </div>
  );
}
