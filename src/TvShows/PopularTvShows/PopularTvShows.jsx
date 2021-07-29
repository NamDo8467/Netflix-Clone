import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  displayDetailsButton,
  closeDetailsButton,
  displayOverview,
  hoverOverDetailsButton,
  leaveDetailButton,
} from "../../Helpers/Helpers";
import "../../TvShows/TvShows.css";
function PopularTvShows() {
  const [tvShows, setTvShows] = useState([]);

  // Get the popular TV shows from page randomly generated between 0 and 500
  const getTvShowList = async () => {
    let tvShowIndex = [];

    let n = Math.floor(Math.random() * 20);
    try {
      const page = Math.floor(Math.random() * 100) + 1;
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=cc803c8c2a7e8fddea1b3ff64514f0b4&language=en-US&page=${page}`
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
    <section className="popular-tv-shows">
      <h3 className="category">Popular</h3>
      <div className="tv-shows">
        {tvShows.map((tvShow) => {
          if (tvShow.poster_path !== "") {
            return (
              <div className="tv-show-card">
                <img
                  className="tv-show-poster"
                  src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                  alt="TV Show poster"
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

export default PopularTvShows;
