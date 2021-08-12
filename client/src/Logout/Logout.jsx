import React from "react";
import { useHistory } from "react-router-dom";
import userIcon from "../images/userIcon.png";
import axios from "axios";
import { displayLogout, hideLogout } from "../Helpers/Helpers";
function Logout(props) {
  let history = useHistory();
  const logout = async (e) => {
    e.preventDefault();
    const result = await axios.get(
      "https://whispering-plains-27657.herokuapp.com/logout",
      "",
      {
        withCredentials: true,
      }
    );
    console.log(result.data);
    localStorage.removeItem("name");
    localStorage.removeItem("cookie");
    // document.cookie = "cookie=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/logout";
    document.cookie ="cookie=; max-age=0; path=/";
    history.push("/");
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
        <p>{localStorage.getItem("name")}</p>
      </div>
      <div className="logout-link">
        <a href="/" onClick={(e) => logout(e)}>
          Sign out of Netflix
        </a>
      </div>
    </div>
  );
}

export default Logout;
