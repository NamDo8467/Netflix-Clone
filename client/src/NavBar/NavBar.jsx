import React from "react"
import "./NavBar.css"
import netflixLogo from "../images/netflix-logo.svg"

function NavBar() {
	return (
		<div className='navbar-container'>
			<a href='/'>
				{" "}
				<img className='netflix-logo' src={netflixLogo} alt='netflix logo' />
			</a>
			<a className='sign-in-button' href='/login'>
				Sign In
			</a>
		</div>
	)
}

export default NavBar
