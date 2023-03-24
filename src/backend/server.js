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

// const newUser = require("../src/backend/models/newUser");
// const { collection } = require("./models/Anime");

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/", async function (req, res) {
  const { email, password } = req.body;
  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json("exits");
    } else {
      res.json("notexits");
    }
  } catch (error) {
    res.json(error);
  }
});
app.post("/signup", async function (req, res) {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
    toWatch: [],
    watching: [],
    completed: [],
  };

  try {
    const check = await db.collection("WatchList").findOne({ email: email });
    if (check) {
      res.json("exits");
    } else {
      res.json("notexits");
      await db.collection("WatchList").insertOne(data);
    }
  } catch (error) {
    console.log(error);
  }
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

app.get("/watchList", async (req, res) => {
  db.collection("WatchList")
    .find({})
    .toArray((err, docs) => {
      if (err) throw err;
      let malIds = docs.map((doc) => doc["doc"]["mal_id"]);
      res.send(malIds);
      // console.log(docs[0]["doc"]);
      db.close();
    });
});

app.get("/getHomeAnimes", (req, res) => {
  db.collection("Animes")
    .find({})
    .toArray((err, docs) => {
      res.send(docs);
      // db.close();
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
