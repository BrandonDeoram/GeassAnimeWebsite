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
      <div className={styles.rowWrapper}>
        <div className={styles.pictureContainer}>
          <img
            src="https://images.alphacoders.com/986/986902.png"
            alt="no pic"
          />
        </div>
        <div className={styles.formContainer}>
          <p>Welcome back</p>
          <h3>Login to you Account</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label>Emails</label>
              <input
                type="text"
                name="email"
                required
                className={styles.formInput}
              />
              {/* {renderErrorMessage("uname")} */}
            </div>
            <div className={styles.inputContainer}>
              <label>Password </label>
              <input
                type="password"
                name="password"
                required
                className={styles.formInput}
              />
              {/* {renderErrorMessage("pass")} */}
            </div>
            <div className={styles.buttonContainer}>
              <input type="submit" className={styles.submitButton} />
              <button
                className={styles.registerButton}
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
