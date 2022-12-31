import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  validatorLogin,
  validatorName,
  validatorPassword,
} from "../utils/validator";
import { Fragment } from "react";

export const Register = () => {
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [password, setPassowrd] = useState("");
  const [passwordConfirm, setPassowrdConfirm] = useState("");
  const [errorTextLogin, setErrorTextLogin] = useState<string[]>([]);
  const [errorTextName, setErrorTextName] = useState<string[]>([]);
  const [errorTextPassword, setErrorTextPassword] = useState<string[]>([]);
  const [errorTextPasswordConfirm, setErrorTextPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const validName = (value: string) => {};

  const handlerLogin = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogin(event.target.value);
  };

  const handlerName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
    validName(event.target.value);
  };

  const handlerPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null
  ) => {
    if (event == null) {
      return;
    }
    setPassowrd(event.target.value);
  };

  const handlerPasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassowrdConfirm(event.target.value);
  };

  useEffect(() => {
    console.log("useEffect login")
    const erros = validatorLogin(login);
    if (
      (login.length <= 0 &&
        name.length <= 0 &&
        password.length <= 0 &&
        passwordConfirm.length <= 0) ||
      erros.length <= 0
    ) {
      setErrorTextLogin([]);
    } else {
      setErrorTextLogin(erros);
    }
  }, [login, name, password, passwordConfirm]);

  useEffect(() => {
    console.log("useEffect name")
    const erros = validatorName(name);
    if (
      (name.length <= 0 &&
        password.length <= 0 &&
        passwordConfirm.length <= 0) ||
      erros.length <= 0
    ) {
      setErrorTextName([]);
    } else {
      setErrorTextName(erros);
    }
  }, [name, password, passwordConfirm]);

  useEffect(() => {
    console.log("useEffect passConfirm")
    if (passwordConfirm.length > 0 && password != passwordConfirm) {
      setErrorTextPasswordConfirm("AS SENHAS DEVEM SER IGUAIS");
    } else {
      setErrorTextPasswordConfirm("");
    }

    const erros = validatorPassword(password);
    if (password.length <= 0 || erros.length <= 0) {
      setErrorTextPassword([]);
    } else {
      setErrorTextPassword(erros);
    }
  }, [password, passwordConfirm]);

  return (
    <>
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
            error={errorTextLogin.length > 0}
            helperText={errorTextLogin.map((error) => (
              <Fragment key={Math.random()}>{error}</Fragment>
            ))}
          ></TextField>
          <TextField
            placeholder="Nome"
            onChange={handlerName}
            value={name}
            error={errorTextName.length > 0}
            helperText={errorTextName}
          ></TextField>
          <TextField
            placeholder="Senha"
            onChange={handlerPassword}
            value={password}
            type={"password"}
            error={errorTextPassword.length > 0}
            helperText={errorTextPassword.map((error) => (
              <Fragment key={Math.random()}>{error}</Fragment>
            ))}
          ></TextField>
          <TextField
            placeholder="Confirmar Senha"
            onChange={handlerPasswordConfirm}
            value={passwordConfirm}
            type={"password"}
            error={errorTextPasswordConfirm.length > 0}
            helperText={errorTextPasswordConfirm}
          ></TextField>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            sx={{ padding: "10px", borderRadius: "10px", width: "100%" }}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </>
  );
};
