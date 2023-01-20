import { render, screen, within } from "@testing-library/react";
import { AuthProvider } from "../../Context/AuthContext";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";
import { Register } from "./Register";
import clientAuth from "../../Client/User";
import renderer from "react-test-renderer";
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const renderRegister = () => {
  render(
    <AuthProvider>
      <Register />
    </AuthProvider>
  );
};

const renderRegisterAct = async () => {
  await act(() => {
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );
  });
};

describe("<Register>", () => {
  it("should render Correctly", () => {
    renderRegister();

    expect(screen.getByPlaceholderText(/login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument();
    expect(screen.getByTestId(/input-password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirmar senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /registrar/i,
      })
    ).toBeInTheDocument();
  });

  it("should render (error) when not insert somethings in field confirmar senha", async () => {
    renderRegister();
    await waitFor(() => {
      userEvent.type(screen.getByPlaceholderText(/confirmar senha/i), "12345");
    });

    expect(
      screen.getByText(/login não pode ficar em branco/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/nome não pode ficar em branco/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/as senhas devem ser iguais/i)).toBeInTheDocument();
  });

  it("should render (error) when insert somethings in field login", async () => {
    await renderRegisterAct();
    await waitFor(() => {
      const view = screen.getByTestId("input-password");
      userEvent.type(within(view).getByPlaceholderText(/senha/i), "1");
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          /pelo menos 8 caracters\.pelo menos 2 numeros\.pelo menos 1 caractere especial: !\-@\-#\-\$\-%\-&\-\?\-\*/i
        )
      ).toBeInTheDocument();
    });
  });

  it("should render (error) when insert somethings in field login", async () => {
    await renderRegisterAct();
    await waitFor(() => {
      const view = screen.getByTestId("input-password");
      userEvent.type(within(view).getByPlaceholderText(/senha/i), "12");
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          /pelo menos 8 caracters\.pelo menos 1 caractere especial: !\-@\-#\-\$\-%\-&\-\?\-\*/i
        )
      ).toBeInTheDocument();
    });
  });

  it("should render error (USUARIO JÁ EXISTENTE!)", async () => {
    await renderRegisterAct();
    await waitFor(() => {
      const view = screen.getByTestId("input-password");
      userEvent.type(within(view).getByPlaceholderText(/senha/i), "12#");
    });
    await waitFor(() => {
      expect(screen.getByText(/pelo menos 8 caracters\./i)).toBeInTheDocument();
    });
  });

  it("should render (error ?) when insert somethings in field login", async () => {
    const mockClienteAuth = jest
      .spyOn(clientAuth, "registerUser")
      .mockRejectedValue(new Error("USUARIO JÁ EXISTENTE!"));

    await renderRegisterAct();
    await waitFor(() => {
      const view = screen.getByTestId("input-password");
      userEvent.type(within(view).getByPlaceholderText(/senha/i), "12#Aa2345");
      userEvent.type(
        screen.getByPlaceholderText(/login/i),
        "icarotest@test.com"
      );
      userEvent.type(
        screen.getByPlaceholderText(/nome/i),
        "icarotest@test.com"
      );
      userEvent.type(
        screen.getByPlaceholderText(/confirmar senha/i),
        "12#Aa2345"
      );
    });
    await waitFor(() => {
      userEvent.click(screen.getByRole("button", { name: /registrar/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: /USUARIO JÁ EXISTENTE!/i })
      ).toBeInTheDocument();
    });
  });

  it("should render (USUARIO CADASTRADO COM SUCESSO!)", async () => {
    jest.spyOn(clientAuth, "registerUser").mockResolvedValue({} as any);

    await renderRegisterAct();
    await waitFor(() => {
      const view = screen.getByTestId("input-password");
      userEvent.type(within(view).getByPlaceholderText(/senha/i), "12#Aa2345");
      userEvent.type(
        screen.getByPlaceholderText(/login/i),
        "icarotest@test.com"
      );
      userEvent.type(
        screen.getByPlaceholderText(/nome/i),
        "icarotest@test.com"
      );
      userEvent.type(
        screen.getByPlaceholderText(/confirmar senha/i),
        "12#Aa2345"
      );
    });
    await waitFor(() => {
      userEvent.click(screen.getByRole("button", { name: /registrar/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: /USUARIO CADASTRADO COM SUCESSO!/i })
      ).toBeInTheDocument();
    });
  });

  it("Matches DOM Snapshot", () => {
    const domTree = renderer
      .create(
        <AuthProvider>
          <Register />
        </AuthProvider>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
