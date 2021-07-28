import React from "react";
import netflixLogo from "../images/netflix-logo.svg";
import userIcon from "../images/userIcon.png";
import breakingBad from "../images/breaking_bad.png";
import "./TvShowsContent.css";
import playButton from "../images/play-button-icon.png";

import PopularTvShows from "./PopularTvShows/PopularTvShows";
import FamilyTvShows from "./FamilyTvShows/FamilyTvShows";
import ComedyTvShows from "./ComedyTvShows/ComedyTvShows";

function TvShowsContent() {
  const playTrailer = (videoID = `XZ8daibM3AE`) => {
    const iframeContainer = document.createElement("div");
    iframeContainer.className = "iframe-container";
    const iframe = document.createElement("iframe");

    iframe.setAttribute("scrolling", "yes");
  
    iframe.src = `https://www.youtube.com/embed/${videoID}`;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.title = "Breaking bad";
    iframe.allowFullscreen = "true";
    iframeContainer.appendChild(iframe);

    const section = document.querySelector(".head");

    section.append(iframeContainer);

    let iframeHorizontal =
      iframe.getBoundingClientRect().left + iframe.offsetWidth;
    let iframeVertical =
      iframe.getBoundingClientRect().top + iframe.offsetHeight;

    document.addEventListener("click", (e) => {
      if (e.clientX > iframeHorizontal || e.clientY > iframeVertical) {
        iframeContainer.remove();
      } else {
        return;
      }
    });

    setTimeout(() => {
      if (!document.querySelector('iframe')) {
        alert("Trailer is unavailable")
      }
    },1000);
  };

  return (
    <div>
      <section className="head">
        <nav className="nav-bar">
          <a href="/">
            <img
              className="netflix-logo"
              src={netflixLogo}
              alt="netflix logo"
            />
          </a>
          <ul>
            <li>TV Show</li>
            <li>Movies</li>
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
            When Walter White, a New Mexico chemistry teacher, is diagnosed with
            Stage III cancer and given a prognosis of only two years left to
            live. He becomes filled with a sense of fearlessness and an
            unrelenting desire to secure his family's financial future at any
            cost as he enters the dangerous world of drugs and crime
          </p>
          <button className="breaking-bad-button" onClick={()=>{playTrailer()}}>
            <img
              className="play-button-icon"
              src={playButton}
              alt="play button"
            />
            <p style={{ fontSize: "20px" }}>Play</p>
          </button>
        </div>
      </section>
      <PopularTvShows playTrailer={playTrailer} />
      <FamilyTvShows playTrailer={playTrailer} />
      <ComedyTvShows playTrailer={playTrailer} />

    </div>
  );
}

export default TvShowsContent;
