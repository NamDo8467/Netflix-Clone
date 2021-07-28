const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const verifyCookie = (req, res, next) => {
  const cookie = req.cookies.cookie;
  if (cookie) {
    jwt.verify(cookie, "netflix secret key", (err, result) => {
      if (err) {
        res.status(400).send({message:"Not verified"})
      } else {
        // console.log(result);
        next();
      }
    });
  } else {
    res.status(400).send({message:"Not verified"})

  }
};

module.exports = verifyCookie;
