import axios from "axios";
const  getMovies = async (link, setMovies) => {
  let movieIndex = [];
  
    //Pick a random movie from the array consists of 20 movies
    let n = Math.floor(Math.random() * 20);
    
  try {
    const response = await axios.get(link);
    let temp = [];
    while (movieIndex.length <= 5) {
      n = Math.floor(Math.random() * 20);
      if (movieIndex.indexOf(n) == -1) {
        movieIndex.push(n);
        temp.push(response.data.results[n]);
      }
    }
      setMovies(temp)
  } catch (err) {
      console.log(err)
  }
};

export default getMovies