import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <Box sx={{minHeight:"484.5px"}}>
    <Container
        maxWidth="md"
        sx={{
          bgcolor: "#bfa38d",
          borderRadius: "25px",
          textAlign: "justify",
          marginTop:"100px",
        }}
      >
        <Typography sx={{ fontSize: "25px", padding: "30px 40px", }}>
          <span>
            Este site foi produzido por Ícaro Santos, com o intuito de aprender
            sobre o uso dos componente do Material UI e também para estudar
            alguns conceitos do React, dentre eles: react-dom, react-routers,
            react-context entre outros.
          </span>
          <span>
            O intutito desse site é apenas o front-end da aplicação, foi criado
            um back-end fake para servir alguns dados de autenticação para a
            aplicação e para servir os dados  foi utilizado a api do
            rick and morty "https://rickandmortyapi.com/documentation/".
          </span>
        </Typography>
      </Container>
    </Box>
  );
};
