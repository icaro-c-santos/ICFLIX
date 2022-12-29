import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRouter = (children: any) => {
  const { userLogged } = useContext(AuthContext);

  return (
    <>
      {Object.values(userLogged).length === 0 ? (
        <Navigate to={"/login"} />
      ) : (
        <h1>olá</h1>
      )}
    </>
  );
};
