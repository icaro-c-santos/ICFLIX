import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Backdrop, backdropClasses, Chip } from "@mui/material";
import { useState } from "react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { useEffect } from "react";
export type TCardViewProps = {
  image: string;
  name: string;
  status: "Dead" | "Alive" | "unknown";
  gender: string;
  species: string;
  location: string;
};

const statusColor = {
  Dead: "#f78080",
  Alive: "#54df54",
  unknown: "rgb(37 27 27 / 87%)",
};

const themeCardClosed = {
  width: 200,
  padding: 2,
  border: "solid",
  borderRadius: "10px",
  transitionProperty: "scale",
  transitionDuration: "500ms",
  textAlign: "center",
  "&:hover": {
    cursor: "pointer",
    scale: "1.2",
    transitionProperty: "scale",
    transitionDuration: "500ms",
  },
};

const themeCardOpen = {
  position: "fixed",
  top: "20px",
  width: 400,
  padding: "20px 20px 0px 20px",
  textAlign: "center",
  cursor: "pointer",
  border: "solid",
  borderRadius: "10px",
  zIndex: 1000,
};

export default function CardView(cardProps: TCardViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState({});
  useEffect(() => {
    if (isOpen) {
      setTheme(themeCardOpen);
    } else {
      setTheme(themeCardClosed);
    }
  }, [isOpen]);

  const handlerClickCardView = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Backdrop open={isOpen} ></Backdrop>
      <Card sx={theme} onClick={handlerClickCardView}>
        <CardMedia
          sx={{
            height: 200,
            width: 200,
            backgroundSize: "contain",
            borderRadius: "10px",
            margin: "auto",
          }}
          image={cardProps.image}
          title={cardProps.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardProps?.name}
          </Typography>

          <Chip
            size="small"
            label={cardProps.status}
            sx={{
              color: "white",
              bgcolor: statusColor[cardProps.status || "unknown"],
            }}
          ></Chip>
          {isOpen && (
            <CardContent>
              <ul
                style={{
                  listStyleType: "none",
                  fontSize: "24px",
                  lineHeight: 2,
                }}
              >
                {cardProps.species && <li>Especie: {cardProps.species}</li>}
                {cardProps.gender && <li>Gênero: {cardProps.gender}</li>}
                {cardProps.location && <li>Origem: {cardProps.location}</li>}
              </ul>
            </CardContent>
          )}
        </CardContent>
      </Card>
    </>
  );
}
