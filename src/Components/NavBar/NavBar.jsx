import React, { useState, useEffect, useRef } from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
export default function NavBar() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <ul className={style.ul}>
        <li className={style.li}>
          {/* <button className={style.signIn}>Sign In</button> */}
          <div>
            <Avatar
              src="https://img.zorores.com/_r/100x100/100/avatar/zoro_normal/av-zz-05.jpeg"
              onClick={toggleMenu}
              style={{ cursor: "pointer", margin: "10px" }}
            ></Avatar>
            {isMenuOpen && (
              <div
                className="dropdown-menu"
                style={{ position: "absolute",right: "0" }}
              >
                <ul>
                  <li>Option 1</li>
                  <li>Option 2</li>
                  <li>Option 3</li>
                </ul>
              </div>
            )}
          </div>
        </li>
      </ul>
    </>
  );
}
