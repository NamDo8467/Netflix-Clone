const jwt = require("jsonwebtoken")

const verifyCookie = (req, res, next) => {
	const cookie = req.params.cookie
	if (cookie) {
		jwt.verify(cookie, "netflix secret key", (err, result) => {
			if (err) {
				res.status(400).send({ message: "Not verified", err, cookie })
			} else {
				next()
			}
		})
	} else {
		res.status(400).send({ message: "Not verified in the else statement below" })
	}
}

module.exports = verifyCookie
