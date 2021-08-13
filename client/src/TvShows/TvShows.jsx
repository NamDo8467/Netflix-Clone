import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TvShowContainer from "./TvShowContainer/TvShowContainer";
import TvShowHead from "./TvShowHead/TvShowHead";
import PopularTvShows from "./PopularTvShows/PopularTvShows";
import FamilyTvShows from "./FamilyTvShows/FamilyTvShows";
import ComedyTvShows from "./ComedyTvShows/ComedyTvShows";
import "./TvShows.css";
import "../TvShows_Movies.css";

function TvShows() {
  let history = useHistory();
  const [isVerified, setIsVerified] = useState("Not verified");

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("https://whispering-plains-27657.herokuapp.com/tvshows", {
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
  }, [isVerified, history]);
  if (isVerified == "Verified") {
    return (
      <TvShowContainer>
        <TvShowHead />
        <PopularTvShows />
        <FamilyTvShows />
        <ComedyTvShows />
      </TvShowContainer>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <p>Access denied</p>
        <a href="/login">Login</a>
      </div>
    );
  }
}

export default TvShows;
