import React from "react";
import styles from "./Top.module.css";
import AnimePage from "../AnimePage/AnimePage";
import Button from "@mui/material/Button";
import { ArrowBack } from "@material-ui/icons";
export default function Top() {
  //get top anime data

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => window.history.back()}
        className={styles.backButton}
        sx={{
          color: "white",
          zIndex: "600",
        }}
      >
        <ArrowBack className={styles.buttonColor} />
      </Button>

      <AnimePage></AnimePage>

      <AnimePage></AnimePage>
    </div>
  );
}
