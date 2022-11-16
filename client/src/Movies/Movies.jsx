import React, { useState, useEffect } from "react"
// import { useHistory } from "react-router-dom"
import MovieContainer from "./MovieContainer/MovieContainer"
import ActionMovies from "./ActionMovies/ActionMovies"
import FantasyMovies from "./FantasyMovies/FantasyMovies"
import RomanceMovies from "./RomanceMovies/RomanceMovies"
import MovieHead from "./MovieHead/MovieHead"
import "./Movies.css"
import "../TvShows_Movies.css"
import axios from "axios"
function Movies() {
	// let history = useHistory()
	// const URL = "https://whispering-plains-27657.herokuapp.com/movies"
	const URL = "https://netflix-clone-t3w3.vercel.app/movies"
	const [isVerified, setIsVerified] = useState("Not verified")

	useEffect(() => {
		const source = axios.CancelToken.source()
		axios
			.get(URL, {
				withCredentials: true,
				cancelToken: source.token
			})
			.then(result => {
				setIsVerified(result.data.message)
			})
			.catch(error => {
				setIsVerified(error.response.data)
				// console.log(error.response.data)
				// setIsVerified(error.)
				// alert(error.message.message)
				// history.goBack()
			})

		return () => {
			source.cancel()
			setIsVerified("Not verified")
		}
	}, [])
	if (isVerified === "Verified") {
		console.log(isVerified)
		return (
			<MovieContainer>
				<MovieHead />
				<ActionMovies />
				<FantasyMovies />
				<RomanceMovies />
			</MovieContainer>
		)
	} else {
		return (
			<div
				style={{
					backgroundColor: "white",
					height: "100vh"
				}}
			>
				<p>Access denied</p>
				<a href='/login'>Login</a>
			</div>
		)
	}
}

export default Movies
