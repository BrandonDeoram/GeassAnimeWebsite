import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import buttonStyle from "../AnimeDetails/AnimeDetails.module.css";
import { ArrowBack } from "@material-ui/icons";

export default function WatchList() {
  //Call MongoDB API
  return (
    <div>
      <Button
        onClick={() => window.history.back()}
        className={buttonStyle.backButton}
        sx={{
          color: "white",
          zIndex: "600",
        }}
      >
        <ArrowBack className={buttonStyle.buttonColor} />
      </Button>
    </div>
  );
}
