const express = require("express")
const route = express.Router()
const User = require("./model/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const verifyCookie = require("./verifyCookie")
// const URL = "http://localhost:3000"
const URL = "https://my-notflix.netlify.app"

const handleError = err => {
	const errors = {
		email: "",
		password: ""
	}

	// check when user login
	if (err.message == "Incorrect email") {
		errors.email = "Incorrect email"
	}

	if (err.message == "Incorrect password") {
		errors.password = "Incorrect password"
	}

	//check when user sign up
	if (err.code == 11000) {
		errors["email"] = "Email already exists"
		return errors
	}

	if (err.message.includes("User validation failed")) {
		Object.values(err.errors).forEach(error => {
			errors[error.path] = error.message
		})
	}
	return errors
}

const createToken = id => {
	const maxAge = 2 * 60 * 60
	return jwt.sign({ id }, "netflix secret key", {
		expiresIn: maxAge
	})
}

route.post("/signup", async (req, res) => {
	const { name, email, password } = req.body
	try {
		const user = await User.create({ name, email, password })
		const token = createToken(user._id)
		res.send({ message: "Successfully signed up" })
	} catch (err) {
		const errors = handleError(err)
		res.status(400).send(errors)
	}
})

route.post("/login", async (req, res) => {
	const email = req.body.email
	const password = req.body.password
	// const path = req.path
	// const url = req.headers.origin
	// console.log(url, path)
	try {
		const user = await User.findOne({ email })
		if (!user) {
			throw Error("Incorrect email")
		}
		const checkPassword = await bcrypt.compare(password, user.password)
		if (!checkPassword) {
			throw Error("Incorrect password")
		} else {
			const jwtAuth = createToken(user._id)

			res.cookie("jwtAuth", jwtAuth, {
				domain: URL,
				maxAge: 2 * 60 * 60 * 1000,
				// sameSite: "none",
				// secure: true,
				httpOnly: true
			})
			res.cookie("name", user.name, {
				domain: URL,
				maxAge: 2 * 60 * 60 * 1000
				// sameSite: "none",
				// secure: true
			})

			res.status(200).json({ message: "logged in ", jwtAuth })
		}
	} catch (err) {
		const errors = handleError(err)
		// console.log(err)
		res.status(400).send(errors)
	}
})
route.get("/logout", (req, res) => {
	res.cookie("jwtAuth", "", { maxAge: 1 })

	res.status(200).send("Logged out")
})
route.get("/movies", verifyCookie, (req, res) => {
	res.status(201).send({ message: "Verified" })
})

route.get("/tvshows", verifyCookie, (req, res) => {
	res.status(201).send({ message: "Verified" })
})

module.exports = route
