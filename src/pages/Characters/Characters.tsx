import react from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { fetchListMovies } from "../../Client/ApiRickAndMorty";
import { useQuery } from "react-query";
import CardView from "../../Components/CardView/CardView";

export const Characters = () => {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: "60px",
            padding: "30px",
          }}
        >
          {data.results.map((person: any) => (
            <CardView
              status={person.status}
              image={person.image}
              name={person.name}
              key={Math.random()}
            />
          ))}
        </Box>
      )}
    </>
  );
};
