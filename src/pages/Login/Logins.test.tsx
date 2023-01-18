import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../Context/AuthContext";
import {
  clearMockAuthenticUser,
  mockAuthenticUser,
} from "../../tests/mocks/localStorageMock";

import { Login } from "./Login";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
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

const renderLoginAct = async () => {
  await act(() => {
    render(
      <AuthProvider>
        <Login></Login>
      </AuthProvider>
    );
  });
};

describe("<Login>", () => {
  it("should call navigate to home if user logged", () => {
    mockAuthenticUser();
    renderLogin();
    expect(mockNavigate).toHaveBeenCalledWith("/");
    clearMockAuthenticUser();
  });

  it("should not call navigate to home if user logged", () => {
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

  it("should render erro ( DIGITE SEU LOGIN ) when click button login with invalid fields", async () => {
    await renderLoginAct();
    await waitFor(() => {
      userEvent.click(screen.getByRole("button", { name: /entrar/i }));
    });
    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: /DIGITE SEU LOGIN!/i })
      ).toBeInTheDocument();
    });
  });

  it("should render erro ( DIGITE SUA SENHA ) when click button login with invalid fields", async () => {
    renderLoginAct();
    await waitFor(() => {
      userEvent.type(screen.getByPlaceholderText(/Login/i), "ICAR");
      userEvent.click(screen.getByRole("button", { name: /entrar/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: /DIGITE SUA SENHA!/i })
      ).toBeInTheDocument();
    });
  });

  it("should render erro ( USUÁRIO NÃO ENCONTRADO ) when click button login with invalid fields", async () => {
    await renderLoginAct();
    await waitFor(() => {
      userEvent.type(screen.getByPlaceholderText(/senha/i), "sdasdsa");
      userEvent.type(screen.getByPlaceholderText(/Login/i), "invalidUser");
      userEvent.click(screen.getByRole("button", { name: /entrar/i }));
    });
    await waitFor(() => {
      screen.getByRole("dialog", { name: /USUARIO NÃO ENCONTRADO!/i });
    });
  });

  it(`should call navigate to "/" when login and password is valid`, async () => {
    await renderLoginAct();
    await waitFor(() => {
      userEvent.type(screen.getByPlaceholderText(/senha/i), "12345");
      userEvent.type(screen.getByPlaceholderText(/Login/i), "icaro");
      userEvent.click(screen.getByRole("button", { name: /entrar/i }));
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it(`should call navigate to "/register" when click button register`, async () => {
    await renderLoginAct();
    await waitFor(() => {
      userEvent.click(screen.getByRole("button", { name: /Registrar/i }));
    });
    expect(mockNavigate).toHaveBeenCalledWith("/register");
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
