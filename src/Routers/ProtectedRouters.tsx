import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export type TAuthData = {
  login?: string;
  token?: string;
  refreshToken?: string;
  name?: string;
  avatarUrl?: string;
  isLoggedIn?: boolean;
};

export const ProtectedRouter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userLogged, setUserLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged.isLoggedIn != null) {
      return;
    }
    const data = localStorage.getItem("userLogged");
    if (data) {
      const user: TAuthData = JSON.parse(data);
      user.isLoggedIn && setUserLogged(user);
      return
    }
    if (userLogged.isLoggedIn != true) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};
