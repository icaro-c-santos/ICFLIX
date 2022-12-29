import { createContext, useEffect, useState } from "react";
import { userView } from "../types";

interface IAuthContext {
  userLogged: userView;
  setUserLogged: (userLogged: userView) => void;
  
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = (props: { children: any }) => {
  const [userLogged, setUserLogged] = useState<userView | {}>({});

  useEffect(() => {
    const user = localStorage.getItem("userLogged");

    if (user) {
      setUserLogged(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{userLogged,setUserLogged} as IAuthContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
