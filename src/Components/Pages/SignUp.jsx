import React from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
//rfced
export default function SignUp() {
  const navigate = useNavigate();
  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const dispath = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.email.value);
    try {
      await axios
        .post("http://localhost:5000/signup", {
          email: event.target.email.value,
          password: event.target.password.value,
        })
        .then((response) => {
          console.log("SIGNUP" + response.data);
          if (response.data === "exits") {
            console.log("exits");
            alert("User Already Exists , Please sign in");
          } else if (response.data === "notexits") {
            console.log("going to home");
            dispath(login());
            navigate("/home");
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
          <p>Welcome</p>
          <h3>Sign up </h3>
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
                onClick={() => navigate("/")}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
