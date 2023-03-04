import React, { useEffect, useState } from 'react';
import { getTopAnimes } from './backend/api';
import CarouselComp from './Components/Carousels/CarouselComp';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage/LandingPage';
import WrapCarousel from './Components/Wrappers/WrapCarousel';
import TitleWCarousel from './Components/TitleWCarousel/TitleWCarousel';
function App() {
  //Make API calls and populate carousel with the animelist 
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    getTopAnimes().then((res) => setTopAnime(res.data));

  }, [])
  return (
    <div className="App">
      <div id="content">
        <NavBar></NavBar>
        <LandingPage></LandingPage>
        <WrapCarousel>
          <TitleWCarousel title={"Novelty"} animes={topAnime}></TitleWCarousel>
          <TitleWCarousel title={"Shounen"} animes={topAnime}></TitleWCarousel>
        </WrapCarousel>

        {/* <CarouselComp props={topAnime} /> */}
      </div>

    </div>

  );
}

export default App;
