import React from "react";
import userIcon from "../images/userIcon.png";
import axios from "axios";
import { displayLogout, hideLogout } from "../Helpers/Helpers";
function Logout(props) {
  const logout = async () => {
    await axios.post("https://whispering-plains-27657.herokuapp.com/logout", "", {
      withCredentials: true,
    });
    return null;
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
        <p>'User'</p>
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
