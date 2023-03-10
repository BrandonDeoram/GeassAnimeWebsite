const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  episodes: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Anime = mongoose.model("WatchList", AnimeSchema);
module.exports = Anime;
