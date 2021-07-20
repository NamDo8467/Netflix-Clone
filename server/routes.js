const express = require("express");
const route = express.Router();
const User = require("./model/User");

route.post("/signup", (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.email,
    password: req.body.password,
  });
  user.save();

  res.send("user registered");
});

route.post("/login", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  User.find({ username: username, password: password })
    .exec()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.send({ message: "not found", error: err });
    });
});

module.exports = route;
