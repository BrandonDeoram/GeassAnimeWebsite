import React, { useState, useEffect, useRef } from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export default function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    // Do something with the selected option
    console.log(`Option ${option} clicked`);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target) &&
        !event.target.classList.contains(style.dropdown)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <ul className={style.ul}>
        <li className={style.li}>
          <div ref={avatarRef}>
            <Avatar
              src="https://img.zorores.com/_r/100x100/100/avatar/zoro_normal/av-zz-05.jpeg"
              onClick={toggleMenu}
              style={{
                cursor: "pointer",
                margin: "10px",
                height: "48px",
                width: "48px",
              }}
            ></Avatar>
            {isMenuOpen && (
              <div
                className={style.dropdown}
                style={{ position: "absolute", right: "0", zIndex: "500" }}
              >
                <ul>
                  <li onClick={() => handleOptionClick(1)}>WatchList</li>
                  <li onClick={() => handleOptionClick(2)}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </li>
      </ul>
    </>
  );
}
