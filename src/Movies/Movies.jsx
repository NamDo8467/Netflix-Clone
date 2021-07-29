import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TvShowsContent from "../TvShows/TvShows";
import userIcon from "../images/userIcon.png";
import playButton from "../images/play-button-icon.png";
import { playTrailer } from "../Helpers/Helpers";
import netflixLogo from "../images/netflix-logo.svg";
import avenger_endgame_logo from "../images/avenger_endgame_logo.png";
import "./Movies.css";

import axios from "axios";
function Movies() {
  let history = useHistory();

  const [isVerified, setIsVerified] = useState("Not verified");

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:5500/movies", {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((result) => {
        setIsVerified(result.data.message);
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });
    if (isVerified == "Not verified") {
      return () => {
        source.cancel();
      };
    }
  }, [isVerified]);
  if (isVerified == "Verified") {
    return (
      <div>
        <section className="movie-head">
          <nav className="nav-bar">
            <a href="/">
              <img
                className="netflix-logo"
                src={netflixLogo}
                alt="netflix logo"
              />
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
            <img className="user-icon" src={userIcon} alt="use icon" />
          </nav>
          <div className="avenger-endgame-overview">
            <img
              className="avenger-endgame-logo"
              src={avenger_endgame_logo}
              alt="avenger endgame"
            />
            <p className="avenger-endgame-paragraph">
              After the devastating events of Avengers: Infinity War, the
              universe is in ruins due to the efforts of the Mad Titan, Thanos.
              With the help of remaining allies, the Avengers must assemble once
              more in order to undo Thanos' actions and restore order to the
              universe once and for all, no matter what consequences may be in
              store.
            </p>
            <button
              className="avenger-endgame-button"
              onClick={() => {
                playTrailer('TcMBFSGVi1c');
              }}
            >
              <img
                className="play-button-icon"
                src={playButton}
                alt="play button"
              />
              <p style={{ fontSize: "20px" }}>Play</p>
            </button>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        Access denied
      </div>
    );
  }
}

export default Movies;
