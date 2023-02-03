import { Box, Typography } from "@mui/material"



export const Footer = () =>{

    return <Box sx={{
        width: "100%",
        height: "100px",
        position: "absolute",
        bottom: "auto",
        left: "0",
        color:"white",
        backgroundColor:"black",
        display:"flex"
        }}>
            
           <Typography sx={{fontSize:"32px",margin:"auto"}}>Create by Icaro C. Santos</Typography>
          
             </Box>
}