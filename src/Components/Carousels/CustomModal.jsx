import React, { useState } from "react";
import { Modal, Box, Button, Select, MenuItem } from "@mui/material";
import styles from "./Carousels.module.css";
import { addToWatchList, deleteAnime } from "../../backend/api";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/updateListSlice";

export default function CustomModal({ open, onClose, anime }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addToList = () => {
    const token = localStorage.getItem("token");
    
    if (selectedOption === "toWatch") {
      addToWatchList(anime, "toWatch", token).then(() => dispatch(increment()));
    } else if (selectedOption === "watching") {
      addToWatchList(anime, "watching", token).then(() => dispatch(increment()));
    } else if (selectedOption === "completed") {
      addToWatchList(anime, "completed", token).then(() => dispatch(increment()));
    } else if (selectedOption === "delete") {
      deleteAnime(anime, token)
        .then(() => {
          dispatch(increment());
          console.log("clicked then");
        })
        .catch((error) => {
          console.error(error);
          console.log("Error caught in deleteAnime() function");
        });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      sx={{
        backgroundColor: "#2c2f3de8",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        height: "300px",
        width: "300px",
        pointerEvents: "auto",
        margin: "auto",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Add to WatchList</h3>
        <div className={styles.columnModal}>
          <Select
            value={selectedOption}
            onChange={handleOptionChange}
            sx={{ color: "white" , backgroundColor: "#171921",width: "200px"}}
          >
            <MenuItem value="toWatch">toWatch</MenuItem>
            <MenuItem value="watching">Watching</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
          </Select>
          <Button onClick={addToList}>Save</Button>
        </div>
      </Box>
    </Modal>
  );
}
