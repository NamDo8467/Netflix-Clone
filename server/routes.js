const { json } = require("express");
const express = require("express");
const route = express.Router();
const User = require("./model/User");
const bcrypt = require("bcrypt");

const handleError = (err) => {
  const errors = {
    email: "",
    password: "",
  };
  if (err.code == 11000) {
    errors["email"] = "Email already exists";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message;
    });
  }
  return errors;
};
route.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Successfully registered" });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
});

route.post("/login", async (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  try {
    let foundUser = await User.find({
      username: username,
      password: password,
    }).exec();
    if (foundUser.length !== 0) {
      res.send(foundUser[0]);
    } else {
      res.send("Not Found");
    }
  } catch (error) {
    res.send(errors);
  }
});

module.exports = route;
