import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Login } from "../pages/Login/Login";

export const ProtectedRouter =  ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userLogged } = useContext(AuthContext);
 
  return userLogged.isLoggedIn?  <>{children}</> : <Login/> ;
};
