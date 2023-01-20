import axios from "axios";
import ENVIRONMENTS from "../config/env.config.js";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    authorization: `Bearer ${ENVIRONMENTS.TOKEN_API_THEMOVIE}`,
  },
});

export const fetchListMovies = async () => {
  const { data } = await axiosInstance.get(
    "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
  );

  return data;
};
