import React, { useState, useEffect } from "react"
import axios from "axios"
// import { useHistory } from "react-router-dom"
import TvShowContainer from "./TvShowContainer/TvShowContainer"
import TvShowHead from "./TvShowHead/TvShowHead"
import PopularTvShows from "./PopularTvShows/PopularTvShows"
import FamilyTvShows from "./FamilyTvShows/FamilyTvShows"
import ComedyTvShows from "./ComedyTvShows/ComedyTvShows"
import "./TvShows.css"
import "../TvShows_Movies.css"

function TvShows() {
	// let history = useHistory()
	let cookie = ""
	if (new Date().getMinutes() - localStorage.getItem("timeSignIn") >= 60) {
		cookie = "time out"
	} else {
		cookie = localStorage.getItem("jwtAuth")
	}

	const URL = "https://netflix-clone-t3w3.vercel.app/tvshows"
	// const URL = "http://localhost:5500/tvshows"

	const [isVerified, setIsVerified] = useState("Not verified")

	useEffect(() => {
		const source = axios.CancelToken.source()

		axios
			.get(`${URL}/${cookie}`, {
				withCredentials: true,
				cancelToken: source.token
			})
			.then(result => {
				setIsVerified(result.data.message)
			})
			.catch(error => {
				setIsVerified(error.response.data)
				console.log(error.response)
				console.log(error.response.data)
			})

		return () => {
			source.cancel()
			setIsVerified("Not verified")
		}
	}, [])
	if (isVerified === "Verified") {
		return (
			<TvShowContainer>
				<TvShowHead />
				<PopularTvShows />
				<FamilyTvShows />
				<ComedyTvShows />
			</TvShowContainer>
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

export default TvShows
