import Box from "@mui/material/Box";
import { List, ListItem, ListItemAvatar } from "@mui/material";
import * as React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WebIcon from "@mui/icons-material/Web";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import { margin } from "@mui/system";

export const Contact = () => {
  const theme = {
    border: "2px solid black",
    height: "100px",
    transitionDuration: "0.5s",
    borderRadius: "15px",
    margin: "20px auto",
    "&:hover": {
      cursor: "pointer",
      scale: "1.1",
      backgroundColor: "blue",
      transitionProperty: "backgroundColor,scale",
      transitionDuration: "0.5s",
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        height: "50px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 280,
          borderRadius: "15px",
          gap: "20px",
        }}
      >
        <ListItem
          sx={theme}
          onClick={() => {
            window.open("https://www.linkedin.com/in/%C3%ADcaro-da-concei%C3%A7%C3%A3o-santos-924892119/", "_blank");
          }}
        >
          <ListItemAvatar>
            <LinkedInIcon
              fontSize={"large"}
              sx={{ marginTop: "7px", marginRight: "45px" }}
            />
          </ListItemAvatar>
          <h2>Linkedin</h2>
        </ListItem>
        <ListItem
          sx={theme}
          onClick={() => {
            window.open("https://github.com/icaro-c-santos", "_blank");
          }}
        >
          <ListItemAvatar>
            <GitHubIcon
              fontSize={"large"}
              sx={{ marginTop: "7px", marginRight: "45px" }}
            />
          </ListItemAvatar>
          <h2>GitHub</h2>
        </ListItem>

        <ListItem
          sx={theme}
          onClick={() => {
            window.open("https://icaro-c-santos.github.io/MEU-PERFIL/", "_blank");
          }}
        >
          <ListItemAvatar>
            <WebIcon
              fontSize={"large"}
              sx={{ marginTop: "7px", marginRight: "45px" }}
            />
          </ListItemAvatar>
          <h2>Portifólio</h2>
        </ListItem>
      </List>
    </Box>
  );
};
