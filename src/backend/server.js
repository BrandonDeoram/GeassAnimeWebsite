const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { connectDB, getDb } = require("./config/db");

//db Connection
connectDB();
let db = getDb();

const api = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
});

// const Anime = require("../src/backend/models/Anime");
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/anime", async (req, res) => {
  const doc = req.body;
  db.collection("WatchList")
    .insertOne({
      doc,
    })
    .then((result) => {
      console.log(res.status(201).json(result));
    })
    .catch((err) => {
      res.status(500).json({ err: "Couldnt create new doc" });
    });
});

app.get("/topAnimes", async (req, res) => {
  try {
    const response = await api.get("top/anime");
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
