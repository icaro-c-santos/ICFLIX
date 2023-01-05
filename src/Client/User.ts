import { type } from "os";
import { TAuthData } from "../Context/AuthContext";

interface typeUserData extends TAuthData {
  password?: string;
}

interface user{
  login:string,
  password:string
}
export const bancoFake: typeUserData[] = [];

bancoFake.push({
  login: "icaro",
  password: "12345",
  name: "ICARO",
  avatarUrl:
    "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png",
});


const loginUser = async (userDates:user): Promise<typeUserData> => {
  const user = bancoFake.find(
    (user) =>
      user.login == userDates.login && user.password == userDates.password
  ) as typeUserData;
  if (!user) {
    throw new Error("USUARIO NÃO ENCONTRADO!");
  }
  return user;
};

const logoutUser = async () => {
  /// chamar endpoint de destruir token
};

const autenticUser = async () =>{
  return null
}

const registerUser = async (userDates: {login:string,password:string,name:string}): Promise<typeUserData> => {
  const user = bancoFake.find((user) => user.login == userDates.login);
  if (user != null) {
    throw new Error("USUARIO JÁ EXISTENTE!");
  } else {
    bancoFake.push({
      login: userDates.login,
      name: userDates.name,
      password: userDates.password,
    });
  }
  const newUser = bancoFake.find(
    (user) =>
      user.login == userDates.login && user.password == userDates.password
  ) as typeUserData;
  return newUser;
};

export const clientAuth = {
  registerUser,
  loginUser,
  logoutUser,
};
