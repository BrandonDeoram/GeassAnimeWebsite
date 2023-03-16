import React, { useEffect, useState } from "react";
import { getTopAnimes, getGenre } from "../../backend/api";
import LandingPage from "../LandingPage/LandingPage";
import TitleWCarousel from "../TitleWCarousel/TitleWCarousel";
import WrapCarousel from "../Wrappers/WrapCarousel";
export default function Home() {
  //Make API calls and populate carousel with the animelist
  const [topAnime, setTopAnime] = useState([]);
  const [actionAnime, setActionAnime] = useState([]);
  const [adventureAnime, setAdventureAnime] = useState([]);
  const [advantAnime, setAdvantAnime] = useState([]);

  useEffect(() => {
    let isMounted = true;

    // Make API calls and set state only if the component is mounted
    if (isMounted) {
      getTopAnimes().then((res) => setTopAnime(res.data));
      getGenre(1)
        .then((res) => setActionAnime(res.data))
        .then(() => getGenre(2).then((res) => setAdventureAnime(res.data)))
        .then(() => getGenre(5).then((res) => setAdvantAnime(res.data)));
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
    </>
  );
}
