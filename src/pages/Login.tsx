import { Box, Button, FilledInput, Modal, TextField } from "@mui/material";
import { maxHeight } from "@mui/system";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useState } from "react";
import { bancoFake, serviceAuthentic } from "../services/Authentic";
import { Navigate, useNavigate } from "react-router";
import ServerModal from "../Components/ModalError/ModalError";
import AlertDialog from "../Components/ModalError/ModalError";

export const Login = () => {
  const { userLogged, setUserLogged } = useContext(AuthContext);
  const [isValidLogin, setIsValidLogin] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassowrd] = useState("");
  const [errorTextLogin, setErrorTextLogin] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (login.length <= 0) {
      setIsValidLogin(true);
    }
  }, []);

  const validLogin = (value: string) => {
    if (value.length <= 0) {
      setIsValidLogin(false);
      setErrorTextLogin("LOGIN NÃO PODE FICAR EM BRANCO!");
    } else {
      setIsValidLogin(true);
      setErrorTextLogin("");
    }

    return true;
  };

  const handlerButtonLogin = async () => {
    try {
      if (login.length <= 0) {
        throw new Error("DIGITE SEU LOGIN!");
      }
      if (password.length <= 0) {
        throw new Error("DIGITE SUA SENHA!");
      }
      const user = await serviceAuthentic.autenticUser({
        login: login,
        passowrd: password,
      });

      setUserLogged(user);
      localStorage.setItem("userLogged", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      setOpenModal(true);
      setMessageAlert(error.message);
    }
  };

  const handlerLogin = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogin(event.target.value);
    validLogin(event.target.value);
  };

  const handlerPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassowrd(event.target.value);
    validLogin(login);
  };

  return (
    <>
      <AlertDialog
        message={messageAlert}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          margin: "50px auto",
          justifyContent: "center",
          bgcolor: "#e6e6e6",
          padding: "40px",
          borderRadius: "25px",
          gap: "20px",
          boxShadow: "0px 2px 13px 0px #0000008f",
        }}
      >
        <Box
          sx={{
            gap: "20px",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            placeholder="Login"
            onChange={handlerLogin}
            value={login}
            error={!isValidLogin}
            helperText={errorTextLogin}
          ></TextField>
          <TextField
            placeholder="Senha"
            onChange={handlerPassword}
            value={password}
            type={"password"}
          ></TextField>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            variant="outlined"
            sx={{ padding: "10px", borderRadius: "10px", width: "180px" }}
          >
            Registrar
          </Button>
          <Button
            variant="outlined"
            sx={{ padding: "10px", borderRadius: "10px", width: "180px" }}
            onClick={handlerButtonLogin}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </>
  );
};
