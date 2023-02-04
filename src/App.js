import './App.css';
import React, { useState, useEffect } from 'react';
import { getTopAnimes } from './backend/api';
function App() {
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    getTopAnimes().then((res) => setTopAnime(res.data));
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        {topAnime.map((anime, id) => {
          return <li key={id}>{anime.title}</li>
        })}

      </header>
    </div>
  );
}

export default App;
