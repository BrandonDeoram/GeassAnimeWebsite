import './App.css';
import React, { useState, useEffect } from 'react';
import { getAnimeData } from './backend/api';
function App() {
  const [topAnime, settopAnime] = useState([]);

  useEffect(() => {
    getAnimeData().then((res) => settopAnime(res.data));
  }, [])
  // console.log(topAnime);


  return (
    <div className="App">
      <header className="App-header">
        {topAnime.map((anime,id)=>{
          return <li key={id}>{anime.title}</li>
        })}

      </header>
    </div>
  );
}

export default App;
