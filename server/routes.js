const express = require("express");
const route = express.Router();
const User = require("./model/User");
const jwt = require("jsonwebtoken");

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

const createToken = (id) => {
  const maxAge = 1 * 24 * 60 * 60;
  return jwt.sign({ id }, "netflix secret key", {
    expiresIn: maxAge,
  });
};

route.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res
      .cookie("cookie", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: 'http://localhost:3000/signup',
      })
      .send({ userID: user._id, message: "Successfully registered" });
    // res.send({ userID: user._id, message: "Successfully registered" });
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
