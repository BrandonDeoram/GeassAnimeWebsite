import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Pages/Home";
import WatchList from "./Components/WatchList/WatchList";
import Login from "./Components/Pages/Login";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignUp from "./Components/Pages/SignUp";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div className="App">
      <div id="content">
        <BrowserRouter>
          {isLoggedIn ? <NavBar /> : null}
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/register" element={<SignUp />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/watchlist" element={<WatchList />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
