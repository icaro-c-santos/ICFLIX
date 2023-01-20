import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRouter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userLogged } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userLogged.isLoggedIn != true) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};
