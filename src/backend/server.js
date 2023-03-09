const express = require('express');
const cors = require('cors');
const axios = require('axios')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");
connectDB();

const api = axios.create({
    baseURL: "https://api.jikan.moe/v4/"
});

app.get('/topAnimes', async (req, res) => {
    // console.log("CALLED TOP ANIME");
    try {
        const response = await api.get("top/anime");
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});



// require('dotenv').config();


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});