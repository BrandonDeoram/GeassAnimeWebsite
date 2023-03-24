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
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      dispatch(login());
    }
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log(isLoggedIn);
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <div className="App">
      <div id="content">
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
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
