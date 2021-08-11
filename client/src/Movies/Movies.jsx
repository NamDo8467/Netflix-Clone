import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MovieContainer from "./MovieContainer/MovieContainer";
import ActionMovies from "./ActionMovies/ActionMovies";
import FantasyMovies from "./FantasyMovies/FantasyMovies";
import RomanceMovies from "./RomanceMovies/RomanceMovies";
import MovieHead from "./MovieHead/MovieHead";
import "./Movies.css";
import "../TvShows_Movies.css";
import axios from "axios";
function Movies() {
  let history = useHistory();

  const [isVerified, setIsVerified] = useState("Not verified");

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("https://whispering-plains-27657.herokuapp.com/movies", {
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
      <MovieContainer>
        <MovieHead />
        <ActionMovies />
        <FantasyMovies />
        <RomanceMovies />
      </MovieContainer>
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

export default Movies;
