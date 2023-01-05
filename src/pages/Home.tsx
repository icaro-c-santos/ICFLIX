import { Link } from "react-router-dom";
import ResponsiveAppBar from "../Components/NaveBar/NaveBar";
import { AuthContext } from "../Context/AuthContext";
import {useEffect} from "react"

export const Home = () => {

  useEffect(()=>{
    console.log("renderizou! 3")


    return ()=>{
      console.log("saiu")
    }
  },[])
  
  return (
    <>
     <h1>Olá</h1>
    </>
  );
};
