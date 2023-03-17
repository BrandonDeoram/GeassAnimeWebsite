import React from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
//rfced
export default function Login() {
  const navigate = useNavigate();
  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const dispath = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    console.log(event);
    try {
      await axios
        .post("http://localhost:5000/", {
          email: event.target.email.value,
          password: event.target.password.value,
        })
        .then((response) => {
          if ((response.data = "exits")) {
            navigate("/home");
            dispath(login());
          } else if ((response.data = "notexits")) {
            alert("Please Sign Up");
          }
        })
        .catch((error) => {
          alert("Wrong Details");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label>Username </label>
            <input type="text" name="email" required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className={styles.inputContainer}>
            <label>Password </label>
            <input type="password" name="password" required />
            {/* {renderErrorMessage("pass")} */}
          </div>
          <div className={styles.buttonContainer}>
            <input type="submit" />
            <button
              className={styles.buttonContainer}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
