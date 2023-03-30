import React, { useState, useEffect, useRef } from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
export default function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const [user, setUser] = useState(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleOptionClick = (option) => {
    if (option === 1) {
      navigate("/watchList");
    } else if (option === 2) {
      localStorage.removeItem("token");
      dispatch(logout());
    }
  };
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/protected",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // setUser(response.data);
        setUser(response.data.email);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
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
                  <li>
                    Email: <span className={style.email}>{user} </span>{" "}
                  </li>
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
