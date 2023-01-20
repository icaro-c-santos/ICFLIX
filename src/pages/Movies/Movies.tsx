import { Link, useParams } from "react-router-dom";
import react from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { fetchListMovies } from "../../Client/MovieDb";
import { useQuery } from "react-query";
import { useContext, useEffect } from "react";
export const Movies = () => {
  const options = ["Nome", "Genêro"];
  const { data, status, isError, isLoading } = useQuery(
    "movie",
    fetchListMovies
  );

  return (
    <>
      <Box>
        <TextField size={"small"} placeholder={"Nome"}></TextField>
        <TextField
          select
          size={"small"}
          sx={{ width: "200px" }}
          label={"Ordenar Por"}
          placeholder={"Nome"}
          defaultValue="Nome"
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {status == "success" && (
        <div>
          {data.results.map((movie: any) => (
            <p key={movie.original_title}>{movie.original_title}</p>
          ))}
        </div>
      )}

      <h1>MOVIES</h1>
    </>
  );
};
