import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
});

export const fetchListMovies = async (pagIndex:number) => {
  const { data } = await axiosInstance.get(`/character?page=${pagIndex}`);
  return data;
};

export const fetchListMoviesBy = async () => {
  const { data } = await axiosInstance.get("/character");

  return data;
};
