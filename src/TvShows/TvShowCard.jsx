import React from "react";
import {
  screenWidth,
  displayDetailsButton,
  closeDetailsButton,
} from "../Helpers/Helpers";

function TvShowCard(props) {
  if (screenWidth <= 800) {
    return (
      <div className="tv-show-card" onTouchStart={displayDetailsButton}>
        {props.children}
      </div>
    );
  } else {
    return (
      <div
        className="tv-show-card"
        onMouseEnter={displayDetailsButton}
        onMouseLeave={closeDetailsButton}
      >
        {props.children}
      </div>
    );
  }
}

export default TvShowCard;
