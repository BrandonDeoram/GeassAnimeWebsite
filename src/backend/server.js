const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;
const crypto = require("crypto");
const secret = "mysecret";

const jwt = require("jsonwebtoken");
const JWT_SECRET = secret;

app.use(cors());
app.use(express.json());

const { connectDB, getDb } = require("./config/db");
const { log } = require("console");

//db Connection
connectDB();
let db = getDb();

const api = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await db
      .collection("WatchList")
      .findOne({ email: email, password: password });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    console.log(token);
    res.json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token " + token);
  if (!token) {
    console.log("failed");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      console.log("failed2");
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    req.userId = decoded.userId;
    next();
  });
}

app.post("/protected", verifyToken, async function (req, res) {
  const { ObjectId } = require("mongodb");
  const userId = new ObjectId(req.userId);
  console.log("try");
  console.log(userId);
  try {
    const user = await db.collection("WatchList").findOne({ _id: userId });
    console.log(user);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const {anime} = req.body;
    user.toWatch.push(anime);

    await db
      .collection("WatchList")
      .updateOne({ _id: userId }, { $set: { toWatch: user.toWatch } });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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
      await db.collection("WatchList").insertOne(data);
      const user = await db
        .collection("WatchList")
        .findOne({ email: email, password: password });

      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      console.log(token);
      res.json({ token: token, status: "notexits" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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
    });
});

app.post("/addtoWatchList", async (req, res) => {
  const { anime, watchList } = req.body;
  const userEmail = req.user;
  console.log(userEmail);
  db.collection("WatchList")
    .updateOne({ email: userEmail }, { $push: { toWatch: anime } })
    .then(() => {
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err: "Couldnt append anime to the toWatch array" });
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
