import React from "react"
import { useHistory } from "react-router-dom"
import userIcon from "../images/userIcon.png"
import axios from "axios"
function Logout() {
	let history = useHistory()
	// const URL = "https://whispering-plains-27657.herokuapp.com/logout"
	const URL = "https://netflix-clone-t3w3.vercel.app/logout"
	const logout = async e => {
		e.preventDefault()
		try {
			const result = await axios.post(URL, {
				withCredentials: true
			})

			console.log(result)
			// document.cookie = "jwtAuth=; max-age=0; path=/"

			history.push("/")
		} catch (error) {
			alert("Error")
			console.log(error)
		}
	}

	return (
		<div className='logout'>
			<div className='logout-user-info'>
				<img className='logout-user-icon' src={userIcon} alt='user icon' />
				<p>{localStorage.getItem("name")}</p>
			</div>
			<div className='logout-link'>
				<a href='/' onClick={e => logout(e)}>
					Sign out of Netflix
				</a>
			</div>
		</div>
	)
}

export default Logout
