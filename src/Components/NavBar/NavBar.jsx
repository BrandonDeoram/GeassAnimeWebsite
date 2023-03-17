import React, { useState, useEffect, useRef } from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <ul className={style.ul}>
        <li className={style.li}>
          <button className={style.signIn}>Sign In</button>
          <button
            className={style.watchListButton}
            onClick={() => navigate("/watchList")}
          >
            Get MongoList
          </button>
        </li>
      </ul>
    </>
  );
}
