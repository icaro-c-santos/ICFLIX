import { createContext, useEffect, useState } from "react";

export type TAuthData = {
  login?: string;
  token?: string;
  refreshToken?: string;
  name?: string;
  avatarUrl?: string;
  isLoggedIn?: boolean;
};

export type TAuthContext = {
  userLogged: TAuthData;
  setUserLogged: (userLogged: TAuthData) => void;
};

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthProvider = (props: { children: any }) => {
  const [userLogged, setUserLogged] = useState<TAuthData>({});

  useEffect(() => {
    const data = localStorage.getItem("userLogged");
    if (data) {
      const user: TAuthData = JSON.parse(data);
      user.isLoggedIn && setUserLogged(user);
    } else {
      setUserLogged({});
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userLogged, setUserLogged } as TAuthContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
