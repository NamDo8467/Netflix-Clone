const express = require("express");
const route = express.Router();
const User = require("./model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyCookie = require("./verifyCookie");

const handleError = (err) => {
  const errors = {
    email: "",
    password: "",
  };

  // check when user login
  if (err.message == "Incorrect email") {
    errors.email = "Incorrect email";
  }

  if (err.message == "Incorrect password") {
    errors.password = "Incorrect password";
  }

  //check when user sign up
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
  const maxAge = 2 * 60 * 60;
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
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .send({ message: "Successfully signed up" });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).send(errors);
  }
});

route.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Incorrect email");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw Error("Incorrect password");
    } else {
      const jwtAuth = createToken(user._id);

      res.cookie("cookie", jwtAuth, {
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        httpOnly: true
      });
      res.cookie("name", user.name, {
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });

      res.status(200).send({ message: "logged in ", name: user.name, jwtAuth:jwtAuth });
    }
  } catch (err) {
    const errors = handleError(err);
    res.status(400).send(errors);
  }
});
route.get("/logout", (req, res) => {
  res.cookie("cookie", "", { maxAge: 1 });
  res.cookie("name", "", { maxAge: 1 });
  res.send("Logged out");
});
route.get("/movies", (req, res) => {
  res.status(201).send({ message: "Verified" });
});

route.get("/tvshows", (req, res) => {
  res.status(201).send({ message: "Verified" });
});

module.exports = route;
