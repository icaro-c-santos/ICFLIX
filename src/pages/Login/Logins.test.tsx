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

const WaitrenderLoginAct = async (execute: () => void) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  await act(() => {
    createRoot(container).render(
      <AuthProvider>
        <Login></Login>
      </AuthProvider>
    );
  });
  await waitFor(execute);
};

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

  it("should call navigate to home if logged", () => {
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

  it("should render erro (digite seu login) when click button login with field login empty", async () => {
    await WaitrenderLoginAct(() => {
      screen
        .getByRole("button", {
          name: /Entrar/i,
        })
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(
      screen.getByRole("dialog", { name: /digite seu login!/i })
    ).toBeInTheDocument();

    cleanup();
    jest.resetAllMocks();
   
  });

  it("should render erro (digite seu login) when click button login with field login empty", async () => {
    await WaitrenderLoginAct(() => {
      screen
        .getByRole("button", {
          name: /Entrar/i,
        })
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(
      screen.getByRole("dialog", { name: /digite seu login!/i })
    ).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
    cleanup();
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

