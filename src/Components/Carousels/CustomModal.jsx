import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import styles from "./Carousels.module.css";
import { addToWatchList, deleteAnime } from "../../backend/api";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/updateListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CustomModal({ open, onClose, anime }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");

  const notify = (action) => {
    if (action != "Deleted") {
      toast.success(
        <span>
          Added to: <span style={{ color: "green" }}>{action}</span>
        </span>,
        {
          className: styles.toast,
          position: "top-center",
          icon: true,
          autoClose: 1000,
          hideProgressBar: true,
          draggable: true,
          progress: false,
          // Apply the custom class for the closeButton
          closeButton: false,
        }
      );
    } else {
      toast.success(<span style={{ color: "red" }}>Deleted Anime </span>, {
        className: styles.toast,
        position: "top-center",
        icon: true,
        autoClose: 1000,
        hideProgressBar: true,
        draggable: true,
        progress: false,
        // Apply the custom class for the closeButton
        closeButton: false,
      });
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addToList = () => {
    const token = localStorage.getItem("token");

    if (selectedOption === "toWatch") {
      addToWatchList(anime, "toWatch", token).then(() => dispatch(increment()));
      notify("toWatch");
    } else if (selectedOption === "watching") {
      addToWatchList(anime, "watching", token).then(() =>
        dispatch(increment())
      );
      notify("Watching");
    } else if (selectedOption === "completed") {
      addToWatchList(anime, "completed", token).then(() =>
        dispatch(increment())
      );
      notify("Completed");
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
      notify("Deleted");
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
        height: "260px",
        width: "300px",
        pointerEvents: "auto",
        margin: "auto",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 className={styles.addTo}>Add to WatchList</h3>
        <p className={styles.title}>{anime ? anime.title : ""}</p>
        <div className={styles.columnModal}>
          <Select
            value={selectedOption}
            onChange={handleOptionChange}
            variant="outlined"
            sx={{
              color: "white",
              backgroundColor: "#171921",
              border: "1px solid #a5965c",
              width: "200px",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "none",
                },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "none",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiSelect-root": {
                backgroundColor: "none",
              },
              "& .MuiOutlinedInput-root:hover .MuiSelect-root": {
                backgroundColor: "none",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
                borderRadius: "none",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            <MenuItem value="toWatch">toWatch</MenuItem>
            <MenuItem value="watching">Watching</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
          </Select>
          <Button onClick={addToList}>Save</Button>
          <ToastContainer />
        </div>
      </Box>
    </Modal>
  );
}
