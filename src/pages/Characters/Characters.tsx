import react, { useState, useEffect } from "react";
import {
  Box,
  Container,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";

import {
  fetchListMovies,
  fetchListMoviesBy,
} from "../../Client/ApiRickAndMorty";
import { useQuery } from "react-query";
import CardView from "../../Components/CardView/CardView";
import { width } from "@mui/system";

type TypeOptionsSelected = {
  title: string;
  options: string[];
};

export type typeDataFetch = {
  pageIndex: number;
  parameter: string | null;
};

export const Characters = () => {
  const [dataFetch, setDataFetch] = useState<typeDataFetch>({
    pageIndex: 1,
    parameter: null,
  });

  const { data, status, isError, isLoading } = useQuery(
    ["character", dataFetch.pageIndex, dataFetch.parameter],
    () => fetchListMoviesBy(dataFetch)
  );

  const options = ["Nome", "Gênero", "Status"];

  const listOptions = {
    optionStatus: {
      title: "Status",
      options: ["alive", "unknown", "Dead"],
    },
    optionsGender: {
      title: "Gênero",
      options: ["Male", "Female", "unknown"],
    },
  };
  const [selectedValue, setSelctedValue] = useState("Nome");
  const [optionsSearch, setOptionSearch] =
    useState<TypeOptionsSelected | null>();

  const [selectValueSearch, setSelectValueSearch] = useState("");

  const handlerOptionSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelctedValue(event.target.value as string);
    event.target.value == "Status" &&
      setOptionSearch(listOptions["optionStatus"]);

    event.target.value == "Gênero" &&
      setOptionSearch(listOptions["optionsGender"]);

    event.target.value == "Nome" && setOptionSearch(null);
  };

  const handlerOptionSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValueSearch(event.target.value);
  };

  const hanlderValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValueSearch(event.target.value);
  };

  useEffect(() => {
    selectedValue == "Status" &&
      setDataFetch({
        ...dataFetch,
        parameter: "&status=" + selectValueSearch,
      });

    selectedValue == "Gênero" &&
      setDataFetch({
        ...dataFetch,
        parameter: "&gender=" + selectValueSearch,
      });
      selectedValue == "Nome" && setDataFetch({
      ...dataFetch,
      parameter: "&name=" + selectValueSearch,
    });
    console.log(selectValueSearch);
  }, [selectValueSearch]);

  const handlerPagination = (event: any, pageIndex: number) => {
    setDataFetch({ ...dataFetch, pageIndex: pageIndex });
  };

  return (
    <Box sx={{ marginTop: "40px", minHeight: "584.5px" }}>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {selectedValue == "Nome" && (
          <TextField
            size={"small"}
            placeholder={"Nome"}
            onChange={hanlderValue}
            value={selectValueSearch}
          ></TextField>
        )}
        {optionsSearch && (
          <TextField
            select
            size={"small"}
            sx={{ width: "200px" }}
            label={optionsSearch?.title}
            value={selectValueSearch}
            onChange={handlerOptionSearch}
          >
            {optionsSearch?.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          select
          size={"small"}
          sx={{ width: "200px" }}
          label={"Buscar Por"}
          value={selectedValue}
          onChange={handlerOptionSelected}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box>
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
                key={person.id}
                gender={person.gender}
                location={person.location.name}
                species={person.species}
              />
            ))}
          </Box>
        )}
      </Box>

      <Pagination
        sx={{ justifyContent: "center", display: "flex", margin: "40px" }}
        onChange={handlerPagination}
        count={data?.info?.pages || 0}
        color="primary"
      />
    </Box>
  );
};
