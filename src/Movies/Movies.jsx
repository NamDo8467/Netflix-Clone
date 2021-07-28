import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TvShowsContent from "../TvShowsContent/TvShowsContent";
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
    return <TvShowsContent />;
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
