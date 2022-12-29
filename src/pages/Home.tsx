import { Link } from "react-router-dom";
import ResponsiveAppBar from "../Components/NaveBar/NaveBar";
import { AuthContext } from "../Context/AuthContext";

export const Home = () => {
  return (
    <>
      <Link to="/">retornar a página inicial</Link>
    </>
  );
};
