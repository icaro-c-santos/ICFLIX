import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({children}: { children: React.ReactNode }) => {
  const { userLogged } = useContext(AuthContext);

  return (
    <>{userLogged.isLoggedIn ?<>{children}</> : <Navigate to={"/login"} />}</>
  );
};
