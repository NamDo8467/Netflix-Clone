const express = require("express");
const cors = require("cors");
const route = require("./routes");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.use(route);
app.get("/", (req, res) => {
  res.send("Hello");
});
mongoose.connect(
  "mongodb+srv://namdo:namdo@cluster0.qftfl.mongodb.net/netflix_db?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
