import React from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
//rfced
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    console.log(event);
    try {
      const response = await axios.post("http://localhost:5000/", {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      const token = response.data.token; // get the token from the response

      // store the token in localStorage
      localStorage.setItem("token", token);

      navigate("/home");
      dispatch(login());
    } catch (error) {
      alert("Wrong Details");
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
            <p>Welcome back</p>
            <h3>Log in to your Account</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputContainer}>
                <label>Emails</label>
                <input
                  type="text"
                  name="email"
                  required
                  className={styles.formInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.passText}>Password </label>
                <input
                  type="password"
                  name="password"
                  required
                  className={styles.formInput}
                />
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
      </div>
    </>
  );
}
