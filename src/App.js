import React, { useEffect, useState } from 'react';
import { getTopAnimes } from './backend/api';
import CarouselComp from './Components/Carousels/CarouselComp';
import NavBar from './Components/NavBar/NavBar';
function App() {
  //Make API calls and populate carousel with the animelist 
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    getTopAnimes().then((res) => setTopAnime(res.data));

  }, [])
  return (
    <div className="App">
      <NavBar></NavBar>
      <CarouselComp props={topAnime} />
    </div>

  );
}

export default App;
