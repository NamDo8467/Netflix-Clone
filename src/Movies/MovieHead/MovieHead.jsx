import React from "react";
import userIcon from "../../images/userIcon.png";
import playButton from "../../images/play-button-icon.png";
import netflixLogo from "../../images/netflix-logo.svg";
import avenger_endgame_logo from "../../images/avenger_endgame_logo.png";
import { playTrailer, displayLogout, screenWidth} from "../../Helpers/Helpers";
import Logout from "../../Logout/Logout";

function MovieHead(prop) {
  return (
    <section className="movie-head">
      <nav className="nav-bar">
        <a href="/">
          <img className="netflix-logo" src={netflixLogo} alt="netflix logo" />
        </a>
        <ul>
          <li>
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="/tvshows"
            >
              TV Show
            </a>
          </li>
          <li>
            {" "}
            <a style={{ color: "white" }} href="/movies">
              Movies
            </a>
          </li>
        </ul>
        <div className="user-icon">
        {screenWidth <= 800 ? (
            <img
              className="user-icon"
              src={userIcon}
              alt="use icon"
              onTouchStart={displayLogout}
            />
          ) : (
            <img
              className="user-icon"
              src={userIcon}
              alt="use icon"
              onClick={displayLogout}
            />
          )}
          <Logout />
        </div>
      </nav>
      <div className="avenger-endgame-overview">
        <img
          className="avenger-endgame-logo"
          src={avenger_endgame_logo}
          alt="avenger endgame"
        />
        <p className="avenger-endgame-paragraph">
          After the devastating events of Avengers: Infinity War, the universe
          is in ruins due to the efforts of the Mad Titan, Thanos. With the help
          of remaining allies, the Avengers must assemble once more in order to
          undo Thanos' actions and restore order to the universe once and for
          all, no matter what consequences may be in store.
        </p>
        <button
          className="play-trailer-button"
          onClick={() => {
            playTrailer("TcMBFSGVi1c");
          }}
        >
          <img
            className="play-trailer-button-icon"
            src={playButton}
            alt="play button"
          />
          <p>Play</p>
        </button>
      </div>
    </section>
  );
}

export default MovieHead;
