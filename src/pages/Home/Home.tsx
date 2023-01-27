import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../../Components/NaveBar/NaveBar";
import { AuthContext } from "../../Context/AuthContext";
import Image from '../../imgs/bg.jpg';
export const Home = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center"}} >
      <img width={"100%"} src={Image}></img>
    </Box>
  );
};
