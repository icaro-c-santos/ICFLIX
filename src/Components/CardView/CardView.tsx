import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import { useState } from "react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { useEffect } from "react";
export type TCardViewProps = {
  image: string;
  name: string;
  status: "Dead" | "Alive" | "unknown";
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
  "&:hover": {
    cursor: "pointer",
    scale: "1.2",
    transitionProperty: "scale",
    transitionDuration: "500ms",
  },
};

const themeCardOpen = {
  position: "absolute",
  width: 600,
  padding: 2,
  border: "solid",
  borderRadius: "10px",
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
              style={{ listStyleType: "none", fontSize: "24px", lineHeight: 2 }}
            >
              <li>Especie: {""}</li>
              <li>Gênero: {""}</li>
              <li>Origem: {""}</li>
              <li>Tipo: {""}</li>
            </ul>
          </CardContent>
        )}
      </CardContent>
    </Card>
  );
}
