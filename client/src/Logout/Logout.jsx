import React from "react";
import userIcon from "../images/userIcon.png";
import axios from "axios";
import { displayLogout, hideLogout } from "../Helpers/Helpers";
function Logout(props) {
  const logout = async () => {
    const result = await axios.post("https://whispering-plains-27657.herokuapp.com/logout", "", {
      withCredentials: true,
    });
    if (result.data == 'Logged out') {
      localStorage.removeItem('name')
      document.cookie('cookie=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/')
      return null;
    }
    
    
  };

  return (
    <div
      className="logout"
      
      // onMouseEnter={displayLogout}
      // onMouseLeave={hideLogout}
    >
      {/* document.cookie.split("=")[1].split("%20").join(" ") */}
      <div className="logout-user-info">
        <img className="logout-user-icon" src={userIcon} alt="user icon" />
        <p>{localStorage.getItem('name')}</p>
      </div>
      <div className="logout-link">
        <a href="/" onClick={logout}>
          Sign out of Netflix
        </a>
      </div>
    </div>
  );
}

export default Logout;
