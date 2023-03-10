const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config({ path: "H:/GeassWebsite/GeassAnimeWebsite/.env" });
console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  getDb: () => mongoose.connection,
};
