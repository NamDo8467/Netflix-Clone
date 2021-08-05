import React, { useState, useEffect } from "react";
import * as helper from "../../Helpers/Helpers";
import "../../TvShows/TvShows.css";
import getTvShows from "../getTvShows";
import TvShowCard from "../TvShowCard";

function PopularTvShows() {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    // Get the popular TV shows from page randomly generated between 0 and 100
    const page = Math.floor(Math.random() * 100) + 1;
    const link = `https://api.themoviedb.org/3/discover/tv?api_key=cc803c8c2a7e8fddea1b3ff64514f0b4&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&with_genres=80&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`;
    getTvShows(link, setTvShows);
  }, [setTvShows]);

  return (
    <section className="popular-tv-shows">
      <h3 className="category">Popular</h3>
      <div className="tv-shows">
        {tvShows.map((tvShow) => {
          return (
            <div key={tvShow.id} className="tv-show-card">
              {helper.screenWidth <= 800 ? (
                <img
                  className="tv-show-poster"
                  src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path ?tvShow.poster_path: tvShow.backdrop_path}`}
                  alt="Tv show poster"
                  title={`${tvShow.name}`}
                  onTouchStart={helper.displayDetailsButton}
                />
              ) : (
                <img
                  className="tv-show-poster"
                  src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path ?tvShow.poster_path: tvShow.backdrop_path}`}
                  alt="Tv show poster"
                  title={`${tvShow.name}`}
                  onMouseEnter={helper.displayDetailsButton}
                  onMouseLeave={helper.closeDetailsButton}
                />
              )}
              <button
                className="detail-button"
                onClick={(event) => {
                  helper.displayOverview(
                    tvShow.name,
                    tvShow.overview,
                    tvShow.backdrop_path,
                    tvShow.id,
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

export default PopularTvShows;
