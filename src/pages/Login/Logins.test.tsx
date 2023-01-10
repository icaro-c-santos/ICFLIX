import { cleanup, render, screen } from "@testing-library/react";
import { Route, Routes, useNavigate } from "react-router";
import { AuthProvider } from "../../Context/AuthContext";
import {
  clearMockAuthenticUser,
  mockAuthenticUser,
} from "../../tests/mocks/localStorageMock";

import { Login } from "./Login";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { waitFor } from "@testing-library/react";
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const renderLogin = () => {
  render(
    <AuthProvider>
      <Login></Login>
    </AuthProvider>
  );
};

describe("<Login>", () => {
  it("should call navigate to home if logged", () => {
    mockAuthenticUser();
    renderLogin();
    expect(mockNavigate).toHaveBeenCalledWith("/");

    clearMockAuthenticUser();
  });

  it("should not call navigate to home if logged", () => {
    clearMockAuthenticUser();
    renderLogin();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should conteiner render Correctly", () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /registrar/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Entrar/i,
      })
    ).toBeInTheDocument();
  });


  it("should render erro ( USUÁRIO NÃO ENCONTRADO ) when click button login with invalid fields", async () => {
    await act(async () => {
     const {baseElement} = render(
        <AuthProvider>
          <Login></Login>
        </AuthProvider>
      );
    });
    await waitFor( () => {
      userEvent.click(screen.getByRole("button", { name: /entrar/i }));
    });
    await waitFor(()=>{
      expect(screen.getByRole('dialog', { name: /DIGITE SEU LOGIN!/i })).toBeInTheDocument();
    })
    screen.logTestingPlaygroundURL();
  });


  it("should render erro ( USUÁRIO NÃO ENCONTRADO ) when click button login with invalid fields", async () => {
    await act(async () => {
     const {baseElement} = render(
        <AuthProvider>
          <Login></Login>
        </AuthProvider>
      );
    });
    await waitFor( () => {
      userEvent.type(screen.getByPlaceholderText(/senha/i), "icaro");
      userEvent.type(screen.getByPlaceholderText(/Login/i), "12345");
      userEvent.click(screen.getByRole("button", { name: /entrar/i }));
    });
    await waitFor(()=>{
      expect(screen.getByRole('dialog', { name: /USUARIO NÃO ENCONTRADO!/i })).toBeInTheDocument();
    })
    screen.logTestingPlaygroundURL();
  });

  it("Matches DOM Snapshot", () => {
    const domTree = renderer
      .create(
        <AuthProvider>
          <Login></Login>
        </AuthProvider>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
