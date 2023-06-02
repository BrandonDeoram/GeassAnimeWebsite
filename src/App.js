import React, { useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Pages/Home";
import WatchList from "./Components/WatchList/WatchList";
import Login from "./Components/Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Pages/SignUp";
import { login } from "./redux/authSlice";
import AnimeDetails from "./Components/AnimeDetails/AnimeDetails";
import Top from "./Components/Pages/Top";
import ViewMore from "./Components/TitleAnimesComp/ViewMore";
import { TitleAnimeProvider } from "./providers/TitleAnimeContext";

function App() {
  // Consists of everything that is needed to render
  const dispatch = useDispatch();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("IS LOGGED IN", isLoggedIn);
    if (isLoggedIn === "true") {
      dispatch(login());
    }
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    document.title = "Geass List";
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <div className="App">
      <div id="content">
        <TitleAnimeProvider>
          <BrowserRouter>
            {isLoggedIn ? <NavBar /> : null}
            <Routes>
              <Route
                exact
                path="/"
                element={isLoggedIn ? <Home /> : <Login />}
              ></Route>
              <Route exact path="/register" element={<SignUp />}></Route>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/watchlist" element={<WatchList />}></Route>
              <Route exact path="/anime/:animeId" element={<AnimeDetails />} />
              <Route exact path="/Top" element={<Top />} />
              <Route path="/latest-animes" element={<ViewMore />} />
              <Route path="/new-animes" element={<ViewMore />} />
            </Routes>
          </BrowserRouter>
        </TitleAnimeProvider>
      </div>
    </div>
  );
}

export default App;
