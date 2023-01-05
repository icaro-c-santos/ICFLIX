import { user, userView } from "../types/index";

export const bancoFake: user[] = [];

bancoFake.push({
  login: "icaro",
  password: "12345",
  name: "ICARO",
  avatarUrl:
    "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png",
});
const autenticUser = async (
  userDates: Omit<user, "avatarUrl" | "name">
): Promise<userView> => {
  const user = bancoFake.find(
    (user) =>
      user.login == userDates.login && user.password == userDates.password
  ) as userView;
  if (!user) {
    throw new Error("USUARIO NÃO ENCONTRADO!");
  }

  return user;
};


const logoutUser = () => {
  localStorage.removeItem("userLogged");
  /// chamar endpoint de destruir token
};


const registerUser = async (userDates: user): Promise<userView> => {
  const user = bancoFake.find((user) => user.login == userDates.login);
  if (user != null) {
    throw new Error("USUARIO JÁ EXISTENTE!");
  } else {
    bancoFake.push({
      login: userDates.login,
      name: userDates.name,
      password: userDates.password,
      avatarUrl: userDates.avatarUrl,
    });
  }
  const newUser = autenticUser({
    login: userDates.login,
    password: userDates.password,
  });
  return newUser;
};

export const serviceAuthentic = {
  registerUser,
  autenticUser,
  logoutUser,
};
