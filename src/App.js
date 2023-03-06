import React, { useEffect, useState } from 'react';
import { getTopAnimes, getGenre } from './backend/api';
import CarouselComp from './Components/Carousels/CarouselComp';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage/LandingPage';
import WrapCarousel from './Components/Wrappers/WrapCarousel';
import TitleWCarousel from './Components/TitleWCarousel/TitleWCarousel';

function App() {
  //Make API calls and populate carousel with the animelist 
  const [topAnime, setTopAnime] = useState([]);
  const [actionAnime, setActionAnime] = useState([]);
  const [adventureAnime, setAdventureAnime] = useState([]);



  useEffect(() => {
    getTopAnimes().then((res) => setTopAnime(res.data));
    getGenre(1).then((res) => setActionAnime(res.data)).then(() => getGenre(2).then((res) => setAdventureAnime(res.data)));

}, [])
return (
  <div className="App">
    <div id="content">
      <NavBar></NavBar>
      <LandingPage></LandingPage>
      <WrapCarousel>
        <TitleWCarousel title={"Top"} animes={topAnime}></TitleWCarousel>
        <TitleWCarousel title={"Action"} animes={actionAnime}></TitleWCarousel>
        <TitleWCarousel title={"Adventure"} animes={adventureAnime}></TitleWCarousel>

      </WrapCarousel>

      {/* <CarouselComp props={topAnime} /> */}
    </div>

  </div>

);
}

export default App;
