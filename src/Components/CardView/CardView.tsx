import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";

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

export default function CardView(cardProps: TCardViewProps) {
  return (
    <Card
      sx={{ width: 200, padding: 2, border: "solid", borderRadius: "10px" }}
    >
      <CardMedia
        sx={{ height: 200, backgroundSize: "contain", borderRadius: "10px" }}
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
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
