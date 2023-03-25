import React from "react";
import { Modal, Box, Button } from "@mui/material";
import styles from "./Carousels.module.css";
import { addToWatchList } from "../../backend/api";
export default function CustomModal({ open, onClose, anime }) {
  const addToList = (option) => {
    if (option === 1) {
      //send anime to toWatchList
      console.log(anime);
      addToWatchList(anime, "toWatch");
    } else if (option === 2) {
      console.log(option);
    } else if (option === 3) {
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
        </div>
      </Box>
    </Modal>
  );
}