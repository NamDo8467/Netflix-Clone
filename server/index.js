const express = require("express");
const cors = require("cors");
const route = require("./routes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const verifyCookie = require("./verifyCookie");

require("dotenv").config();

const app = express();
app.use(cookieParser());

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(route);
app.get("/", (req, res) => {
  res.send("Hello");
});
mongoose.connect(process.env.DB_CONNECTION_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
