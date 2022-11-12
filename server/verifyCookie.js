const jwt = require("jsonwebtoken")

const verifyCookie = (req, res, next) => {
	const cookie = req.cookies.jwtAuth
	if (cookie) {
		jwt.verify(cookie, "netflix secret key", (err, result) => {
			if (err) {
				res.status(400).send({ message: "Not verified" })
			} else {
				next()
			}
		})
	} else {
		res.status(400).send({ message: "Not verified" })
	}
}

module.exports = verifyCookie
