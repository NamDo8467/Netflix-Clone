import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  displayDetailsButton,
  closeDetailsButton,
  displayOverview,
  hoverOverDetailsButton,
  leaveDetailButton,
  playTrailer
} from "../../Helpers/Helpers";

function FamilyTvShows() {
  const [tvShows, setTvShows] = useState([]);

  // Get the family TV shows from page randomly generated between 0 and 100
  const getTvShowList = async () => {
    let tvShowIndex = [];

    let n = Math.floor(Math.random() * 20);
    try {
      const page = Math.floor(Math.random() * 100) + 1;
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=cc803c8c2a7e8fddea1b3ff64514f0b4&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&with_genres=18&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`
      );
      let a = [];
      while (tvShowIndex.length <= 5) {
        n = Math.floor(Math.random() * 20);
        if (tvShowIndex.indexOf(n) == -1) {
          tvShowIndex.push(n);
          a.push(response.data.results[n]);
        }
      }
      setTvShows(a);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTvShowList();
  }, []);

  return (
    <section className="family-tv-shows">
      <h2 className="category">Family</h2>
      <div className="tv-shows">
        {tvShows.map((tvShow) => {
          if (tvShow.poster_path) {
            return (
              <div className="tv-show-card">
                <img
                  className="tv-show-poster"
                  src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                  alt="Tv show poster"
                  title={`${tvShow.name}`}
                  onMouseEnter={displayDetailsButton}
                  onMouseLeave={closeDetailsButton}
                />
                <button
                  className="detail-button"
                  onClick={(event) => {
                    displayOverview(
                      tvShow.name,
                      tvShow.overview,
                      tvShow.backdrop_path,
                      tvShow.id,
                      event
                    );
                  }}
                  onMouseEnter={hoverOverDetailsButton}
                  onMouseLeave={leaveDetailButton}
                >
                  Details
                </button>
              </div>
            );
          } else {
            return (
              <div className="tv-show-card">
                <img
                  className="tv-show-poster"
                  src={`https://image.tmdb.org/t/p/w500/${tvShow.backdrop_path}`}
                  alt="TV Show backdrop"
                  title={`${tvShow.name}`}
                  onMouseEnter={displayDetailsButton}
                  onMouseLeave={closeDetailsButton}
                />
                <button
                  className="detail-button"
                  onClick={(event) => {
                    displayOverview(
                      tvShow.name,
                      tvShow.overview,
                      tvShow.backdrop_path,
                      tvShow.id,
                      event
                    );
                  }}
                  onMouseEnter={hoverOverDetailsButton}
                  onMouseLeave={leaveDetailButton}
                >
                  Details
                </button>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}

export default FamilyTvShows;
