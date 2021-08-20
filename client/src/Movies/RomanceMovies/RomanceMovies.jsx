import React, { useState, useEffect } from "react";
import * as helper from "../../Helpers/Helpers";
import getMovies from "../getMovies";
import "../Movies.css";
function RomanceMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Get the romance movies from page randomly generated between 0 and 100
    let page = Math.floor(Math.random() * 100) + 1;
    const link = `https://api.themoviedb.org/3/discover/movie?api_key=cc803c8c2a7e8fddea1b3ff64514f0b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=10749&with_watch_monetization_types=flatrate`;
    getMovies(link, setMovies);
  }, [setMovies]);
  return (
    <section className="romance-movies">
      <h3 className="category">Romance</h3>
      <div className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="movie-card">
              {helper.screenWidth <= 800 ? (
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500/${
                    movie.poster_path ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt="Movie poster"
                  title={`${movie.name}`}
                  onTouchStart={helper.displayDetailsButton}
                />
              ) : (
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500/${
                    movie.poster_path ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt="Movie poster"
                  title={`${movie.name}`}
                  onMouseEnter={helper.displayDetailsButton}
                  onMouseLeave={helper.closeDetailsButton}
                />
              )}
              <button
                className="detail-button"
                onClick={(event) => {
                  helper.displayOverview(
                    movie.name,
                    movie.overview,
                    movie.backdrop_path,
                    movie.id,
                    event
                  );
                }}
                onMouseEnter={helper.hoverOverDetailsButton}
              >
                Details
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RomanceMovies;
