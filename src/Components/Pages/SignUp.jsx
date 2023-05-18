import React from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { login } from "../../redux/authSlice";

export default function SignUp() {
  const navigate = useNavigate();
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
          console.log("SIGNUP" + JSON.stringify(response["data"]["token"]));
          console.log(response.data.status);
          console.log(response);
          if (response.data.status === "exits") {
            console.log("exits");
            alert("User Already Exists , Please sign in");
          } else if (response.data.status === "notexits") {
            console.log("going to home");
            const token = response["data"]["token"];
            localStorage.setItem("token", token);
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
          <div className={styles.roundContainer}>
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
                <label className={styles.passText}>Password </label>
                <input
                  type="password"
                  name="password"
                  required
                  className={styles.formInput}
                />
                {/* {renderErrorMessage("pass")} */}
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton} > Submit </button>
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
      </div>
    </>
  );
}
