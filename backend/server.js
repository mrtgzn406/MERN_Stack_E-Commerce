const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRoute = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(morgan());
app.use(express.json());

dotenv.config();

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
}

app.use("/api", mainRoute);

const port = 5000;
app.listen(port, function (req, res) {
    connect();
    console.log(`server has been running in port ${port}`);
});
