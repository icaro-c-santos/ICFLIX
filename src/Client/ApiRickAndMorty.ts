import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
});

export const fetchListMovies = async () => {
  const { data } = await axiosInstance.get("/character");

  return data;
};
