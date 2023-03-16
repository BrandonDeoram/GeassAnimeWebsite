import React from "react";
import styles from "./Login.module.css";
//rfced
export default function Login(props) {
  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const handleSubmit = (event) => {
    console.log(event);
  };
  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label>Username </label>
            <input type="text" name="uname" required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className={styles.inputContainer}>
            <label>Password </label>
            <input type="password" name="pass" required />
            {/* {renderErrorMessage("pass")} */}
          </div>
          <div className={styles.buttonContainer}>
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}
