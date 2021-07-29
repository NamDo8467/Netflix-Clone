import React, { useState, useEffect } from "react";
import netflixLogo from "../images/netflix-logo.svg";
import userIcon from "../images/userIcon.png";
import breakingBad from "../images/breaking_bad.png";
import playButton from "../images/play-button-icon.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PopularTvShows from "./PopularTvShows/PopularTvShows";
import FamilyTvShows from "./FamilyTvShows/FamilyTvShows";
import ComedyTvShows from "./ComedyTvShows/ComedyTvShows";
import { playTrailer } from "../Helpers/Helpers";
import "./TvShows.css";
function TvShows() {
  let history = useHistory();

  const [isVerified, setIsVerified] = useState("Not verified");

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:5500/tvshows", {
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
        <section className="tv-show-head">
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
                <a style={{ color: "white" }} href="/tvshows">
                  TV Show
                </a>
              </li>
              <li>
                {" "}
                <a
                  style={{ color: "white", textDecoration: "none" }}
                  href="/movies"
                >
                  Movies
                </a>
              </li>
            </ul>
            <img className="user-icon" src={userIcon} alt="use icon" />
          </nav>
          <div className="breaking-bad-overview">
            <img
              className="breaking-bad-logo"
              src={breakingBad}
              alt="breaking bad"
            />
            <p className="breaking-bad-paragraph">
              When Walter White, a New Mexico chemistry teacher, is diagnosed
              with Stage III cancer and given a prognosis of only two years left
              to live. He becomes filled with a sense of fearlessness and an
              unrelenting desire to secure his family's financial future at any
              cost as he enters the dangerous world of drugs and crime
            </p>
            <button
              className="breaking-bad-button"
              onClick={() => {
                playTrailer();
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
        <PopularTvShows />
        <FamilyTvShows />
        <ComedyTvShows />
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

export default TvShows;
