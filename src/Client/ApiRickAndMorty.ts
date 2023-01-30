import axios from "axios";
import { typeDataFetch } from "../pages/Characters/Characters";

const axiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
});

export const fetchListMovies = async (pagIndex: number) => {
  const { data } = await axiosInstance.get(`/character?page=${pagIndex}`);
  return data;
};

export const fetchListMoviesBy = async ({
  pageIndex,
  parameter,
}: typeDataFetch) => {
  const { data } = await axiosInstance.get(
    `/character?page=${pageIndex}${parameter}`
  );
  console.log(data);
  return data;
};
