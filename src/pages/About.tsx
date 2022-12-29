import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "#bfa38d",
          borderRadius: "25px",
          textAlign: "justify",
          marginTop:"100px"
        }}
      >
        <Typography sx={{ fontSize: "25px", padding: "30px 40px", }}>
          <p>
            Este site foi produzido por Ícaro Santos, com o intuito de aprender
            sobre o uso dos componente do Material UI e também para estudar
            alguns conceitos do React, dentre eles: react-dom, react-routers,
            react-context entre outros.
          </p>
          <p>
            O intutito desse site é apenas o front-end da aplicação, foi criado
            um back-end fake para servir alguns dados de autenticação para a
            aplicação e para servir os dados dos filmes foi utilizado a api do
            themoviedb "https://www.themoviedb.org/documentation/api".
          </p>
        </Typography>
      </Container>
    </>
  );
};
