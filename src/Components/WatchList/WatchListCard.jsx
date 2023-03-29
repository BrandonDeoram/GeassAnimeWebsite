import React from "react";
import style from "./WatchList.module.css";
import SwitchMenu from "./SwitchMenu";
export default function WatchListCard({ image, title }) {
  return (
    <div className={style.listSection}>
      <img src={image} alt={title} />

      <h3>
        <a className={style.titleLink} href="">
          {title}
        </a>
      </h3>
      <SwitchMenu></SwitchMenu>
    </div>
  );
}
