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
  try {
    const user = await db.collection("WatchList").findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

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
      res.json({ token: token, status: "notexits" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Everything to do with CRUD operations
app.post("/addtoWatchList", verifyToken, async (req, res) => {
  const { ObjectId } = require("mongodb");
  const userId = new ObjectId(req.userId);
  //Verify userID
  try {
    const user = await db.collection("WatchList").findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const { anime, watchList } = req.body;
    // Check to see if anime is already in any of the WatchList Collection
    const animeId = anime["mal_id"];
    console.log(animeId);
    const animeStatus = await db.collection("WatchList").findOne({
      $and: [
        { _id: userId },
        {
          $or: [
            { toWatch: { $elemMatch: { mal_id: animeId } } },
            { watching: { $elemMatch: { mal_id: animeId } } },
            { completed: { $elemMatch: { mal_id: animeId } } },
          ],
        },
      ],
    });

    if (animeStatus) {
      let arrayName;
      if (animeStatus.toWatch.find((a) => a.mal_id === animeId)) {
        arrayName = "toWatch";
      } else if (animeStatus.watching.find((a) => a.mal_id === animeId)) {
        arrayName = "watching";
      } else if (animeStatus.completed.find((a) => a.mal_id === animeId)) {
        arrayName = "completed";
      }
      console.log(arrayName);
      // Delete the anime from the current array
      const updateResult = await db
        .collection("WatchList")
        .updateOne(
          { _id: userId },
          { $pull: { [arrayName]: { mal_id: animeId } } }
        );
      if (updateResult.modifiedCount === 1) {
        console.log("Anime deleted from", arrayName);
      }

      // Add the anime to the new array
      switch (watchList) {
        case "toWatch":
          await db
            .collection("WatchList")
            .updateOne({ _id: userId }, { $push: { toWatch: anime } })
            .then(() => {
              res.status(201).json({ success: true });
            })
            .catch((err) => {
              res
                .status(500)
                .json({ err: "Couldnt append anime to the toWatch array" });
            });
          break;
        case "watching":
          await db
            .collection("WatchList")
            .updateOne({ _id: userId }, { $push: { watching: anime } })
            .then(() => {
              res.status(201).json({ success: true });
            })
            .catch((err) => {
              res
                .status(500)
                .json({ err: "Couldnt append anime to the watching array" });
            });
          break;
        case "completed":
          await db
            .collection("WatchList")
            .updateOne({ _id: userId }, { $push: { completed: anime } })
            .then(() => {
              res.status(201).json({ success: true });
            })
            .catch((err) => {
              res
                .status(500)
                .json({ err: "Couldnt append anime to the completed array" });
            });
          break;
      }
    } else {
      console.log("Anime not found adding");
      switch (watchList) {
        case "toWatch":
          await db
            .collection("WatchList")
            .updateOne({ _id: userId }, { $push: { toWatch: anime } })
            .then(() => {
              res.status(201).json({ success: true });
            })
            .catch((err) => {
              res
                .status(500)
                .json({ err: "Couldnt append anime to the toWatch array" });
            });
          break;
        case "watching":
          await db
            .collection("WatchList")
            .updateOne({ _id: userId }, { $push: { watching: anime } })
            .then(() => {
              res.status(201).json({ success: true });
            })
            .catch((err) => {
              res
                .status(500)
                .json({ err: "Couldnt append anime to the watching array" });
            });
          break;
        case "completed":
          await db
            .collection("WatchList")
            .updateOne({ _id: userId }, { $push: { completed: anime } })
            .then(() => {
              res.status(201).json({ success: true });
            })
            .catch((err) => {
              res
                .status(500)
                .json({ err: "Couldnt append anime to the completed array" });
            });
          break;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/deleteAnime", verifyToken, async (req, res) => {
  const { ObjectId } = require("mongodb");
  const userId = new ObjectId(req.userId);
  //Verify userID
  try {
    const user = await db.collection("WatchList").findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const { anime } = req.body;
    // Check to see if anime is already in any of the WatchList Collection
    console.log(anime);
    const animeId = anime["mal_id"];
    console.log(animeId);
    const animeStatus = await db.collection("WatchList").findOne({
      $and: [
        { _id: userId },
        {
          $or: [
            { toWatch: { $elemMatch: { mal_id: animeId } } },
            { watching: { $elemMatch: { mal_id: animeId } } },
            { completed: { $elemMatch: { mal_id: animeId } } },
          ],
        },
      ],
    });

    if (animeStatus) {
      let arrayName;
      if (animeStatus.toWatch.find((a) => a.mal_id === animeId)) {
        arrayName = "toWatch";
      } else if (animeStatus.watching.find((a) => a.mal_id === animeId)) {
        arrayName = "watching";
      } else if (animeStatus.completed.find((a) => a.mal_id === animeId)) {
        arrayName = "completed";
      }
      const updateResult = await db
        .collection("WatchList")
        .updateOne(
          { _id: userId },
          { $pull: { [arrayName]: { mal_id: animeId } } }
        );
      if (updateResult.modifiedCount === 1) {
        console.log("Anime deleted from", arrayName);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getWatchList", verifyToken, async (req, res) => {
  const { ObjectId } = require("mongodb");
  const userId = new ObjectId(req.userId);
  //Verify userID
  try {
    const user = await db.collection("WatchList").findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/watchList", async (req, res) => {
  db.collection("WatchList")
    .find({})
    .toArray((err, docs) => {
      if (err) throw err;
      let malIds = docs.map((doc) => doc["doc"]["mal_id"]);
      res.send(malIds);
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
