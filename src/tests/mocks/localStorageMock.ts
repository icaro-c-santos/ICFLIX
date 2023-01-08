export const mockAuthenticUser = () => {
  window.localStorage.setItem(
    "userLogged",
    JSON.stringify({
      login: "icarosalna@test.com",
      token: "12345",
      refreshToken: "54321",
      name: "icaro",
      isLoggedIn: "true",
    })
  );
};

export const clearMockAuthenticUser = () => {
  window.localStorage.removeItem("userLogged");
};
