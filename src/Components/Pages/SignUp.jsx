import React from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//rfced
export default function SignUp() {
  const navigate = useNavigate();
  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
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
            alert("User Already Exists");
          } else if (response.data === "notexits") {
            console.log("going to home");
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
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label>Email </label>
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
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
