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
	// const URL = "https://whispering-plains-27657.herokuapp.com/tvshows"
	const URL = "https://netflix-clone-t3w3.vercel.app/tvshows"
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
				// history.goBack();
			})

		return () => {
			source.cancel()
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
					height: "100vh",
					marginLeft: "50px"
				}}
			>
				<p>Access denied</p>
				<a href='/login'>Login</a>
			</div>
		)
	}
}

export default TvShows
