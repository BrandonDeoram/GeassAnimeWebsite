import React from "react";
import { Modal, Box, Button } from "@mui/material";
import styles from "./Carousels.module.css";
import { addToWatchList } from "../../backend/api";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/updateListSlice";
export default function CustomModal({ open, onClose, anime }) {
  const dispatch = useDispatch();
  const addToList = (option) => {
    const token = localStorage.getItem("token");
    if (option === 1) {
      addToWatchList(anime, "toWatch", token);
    } else if (option === 2) {
      addToWatchList(anime, "watching", token);
    } else if (option === 3) {
      addToWatchList(anime, "completed", token);
    } else if (option === 4) {
      // addToWatchList(anime, "completed", token);
    }
    dispatch(increment());
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
        backgroundColor: "rgba(0,0,0,0.3)",
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
          <Button onClick={() => addToList(1)}>toWatch</Button>
          <Button onClick={() => addToList(2)}>Watching</Button>
          <Button onClick={() => addToList(3)}>Completed</Button>
          <Button onClick={() => addToList(4)}>Delete</Button>
        </div>
      </Box>
    </Modal>
  );
}
