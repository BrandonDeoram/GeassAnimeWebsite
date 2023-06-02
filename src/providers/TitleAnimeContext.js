import { createContext, useState } from "react";

const TitleAnimeContext = createContext();

export function TitleAnimeProvider({ children }) {
  const [titleAnime, setTitleAnime] = useState("");
  const [provAnimes, setProvAnimes] = useState([]);

  const settingTitleAnime = (name) => {
    console.log("PROVIDER", name);
    setTitleAnime(name);
  };
  const settingAnimes = (animes) => {
    console.log("PROVIDER", animes);
    setProvAnimes(animes);
  };
  return (
    <TitleAnimeContext.Provider
      value={{ titleAnime, provAnimes, settingTitleAnime, settingAnimes }}
    >
      {children}
    </TitleAnimeContext.Provider>
  );
}

export default TitleAnimeContext;
