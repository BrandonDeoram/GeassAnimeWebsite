import React, { useEffect, useState } from "react";
import { getHomeAnimes } from "../../backend/api";
import LandingPage from "../LandingPage/LandingPage";
import TitleWCarousel from "../TitleWCarousel/TitleWCarousel";
import WrapCarousel from "../Wrappers/WrapCarousel";
import style from "./Login.module.css";
import { ReactSVG } from "react-svg";
import ccImage from "../../svg/cc.svg";
import TitlesAnimes from "../TitleAnimesComp/TitlesAnimes";
export default function Home() {
  //Make API calls and populate carousel with the animelist
  const [topAnime, setTopAnime] = useState([]);
  const [actionAnime, setActionAnime] = useState([]);
  const [adventureAnime, setAdventureAnime] = useState([]);
  const [advantAnime, setAdvantAnime] = useState([]);

  useEffect(() => {
    let isMounted = true;

    // Make API calls and set state only if the component is mounted, set data
    if (isMounted) {
      getHomeAnimes().then((data) => {
        setTopAnime(data["topAnime"]);
        setActionAnime(data["actionAnime"]);
        setAdventureAnime(data["adventureAnime"]);
        setAdvantAnime(data["advantAnime"]);
        console.log("called");
      });
    }

    // Return a cleanup function to be called when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <LandingPage></LandingPage>
      <WrapCarousel>
        <TitleWCarousel title={"Top"} animes={topAnime}></TitleWCarousel>
        <TitleWCarousel title={"Action"} animes={actionAnime}></TitleWCarousel>
        <TitleWCarousel
          title={"Adventure"}
          animes={adventureAnime}
        ></TitleWCarousel>
        <TitleWCarousel
          title={"Advant Garde"}
          animes={advantAnime}
        ></TitleWCarousel>
      </WrapCarousel>
      <TitlesAnimes title="Latest Animes" animes={topAnime} />
      <TitlesAnimes title="New Animes" animes={actionAnime} />
      <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        style={{
          position: "fixed",
          padding: "1rem 2rem",
          fontSize: "20px",
          bottom: "40px",
          right: "40px",
          backgroundColor: "#0C9",
          color: "#fff",
          textAlign: "center",
        }}
      >
        Scroll to top
      </button>
      <footer className={style.footerClass}>
        Copyright to Geass
        <ReactSVG
          src={ccImage}
          style={{
            height: "20px",
            width: "20px",
            margin: "10px",
            fill: "white",
          }}
        />
      </footer>
    </>
  );
}
