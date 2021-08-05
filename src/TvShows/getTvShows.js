import axios from "axios";
const getTvShows = async (link, setTvShow) => {
  let tvShowIndex = [];
  let n = Math.floor(Math.random() * 20);
  try {
    const response = await axios.get(link);

    let temp = [];
    while (tvShowIndex.length <= 5) {
      if (tvShowIndex.indexOf(n) == -1) {
        tvShowIndex.push(n);
        temp.push(response.data.results[n]);
      }
      n = Math.floor(Math.random() * 20);
    }
    setTvShow(temp);
  } catch (err) {
    console.log(err);
  }
};

export default getTvShows;
