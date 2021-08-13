const express = require("express");
const cors = require("cors");
const route = require("./routes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const verifyCookie = require("./verifyCookie");

require("dotenv").config();

const app = express();
app.use(cookieParser());
// app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://my-notflix.netlify.app/"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
let corsOptions = {
   // some legacy browsers (IE11, various SmartTVs) choke on 204
  //  https://my-notflix.netlify.app
};

app.use(cors({origin: "https://my-notflix.netlify.app",
  optionsSuccessStatus: 200, credentials: true
}));
app.set('trust proxy', 1)
app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://my-notflix.netlify.app");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next()
});


app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(route);
app.get("/", (req, res) => {
  res.send("Hello Nam Do your server is up and running");
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
