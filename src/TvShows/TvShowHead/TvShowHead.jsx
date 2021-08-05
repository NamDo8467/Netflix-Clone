import React from "react";
import netflixLogo from "../../images/netflix-logo.svg";
import userIcon from "../../images/userIcon.png";
import breakingBad from "../../images/breaking_bad_logo.png";
import playButton from "../../images/play-button-icon.png";
import Logout from "../../Logout/Logout";
import { playTrailer, displayLogout, screenWidth } from "../../Helpers/Helpers";

function TvShowHead() {
  return (
    <section className="tv-show-head">
      <nav className="nav-bar">
        <a href="/">
          <img className="netflix-logo" src={netflixLogo} alt="netflix logo" />
        </a>
        <ul>
          <li>
            <a style={{ color: "white" }} href="/tvshows">
              TV Show
            </a>
          </li>
          <li>
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="/movies"
            >
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
      <div className="breaking-bad-overview">
        <img
          className="breaking-bad-logo"
          src={breakingBad}
          alt="breaking bad"
        />
        <p className="breaking-bad-paragraph">
          When Walter White, a New Mexico chemistry teacher, is diagnosed with
          Stage III cancer and given a prognosis of only two years left to live.
          He becomes filled with a sense of fearlessness and an unrelenting
          desire to secure his family's financial future at any cost as he
          enters the dangerous world of drugs and crime
        </p>
        <button
          className="play-trailer-button"
          onClick={() => {
            playTrailer();
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

export default TvShowHead;
