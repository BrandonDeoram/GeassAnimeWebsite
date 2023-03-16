import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Pages/Home";
import WatchList from "./Components/WatchList/WatchList";
import Login from "./Components/Pages/Login";
import AuthContext from "./Components/Context/AuthContext";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <div id="content">
        <AuthContext>
          <BrowserRouter>
            <NavBar></NavBar>
            <Routes>
              <Route exact path="/" element={<Login />}></Route>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/watchlist" element={<WatchList />}></Route>
            </Routes>
          </BrowserRouter>
        </AuthContext>
      </div>
    </div>
  );
}

export default App;
