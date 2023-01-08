import { render, screen } from "@testing-library/react";
import { Route, Routes, useNavigate } from "react-router";
import { AuthProvider } from "../../Context/AuthContext";
import {
  clearMockAuthenticUser,
  mockAuthenticUser,
} from "../../tests/mocks/localStorageMock";
import { Login } from "./Login";
import renderer from "react-test-renderer";
import { Link } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("<Login>", () => {
  it("should call navigate to home if logged", () => {
    mockAuthenticUser();
    render(
      <AuthProvider>
        <Login></Login>
      </AuthProvider>
    );
    expect(mockNavigate).toHaveBeenCalledWith("/");

    clearMockAuthenticUser();
  });

  it("should call navigate to home if logged", () => {
    clearMockAuthenticUser();
    const { baseElement } = render(
      <AuthProvider>
        <Login></Login>
      </AuthProvider>
    );

    screen.logTestingPlaygroundURL();
    expect(mockNavigate).not.toHaveBeenCalled();
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
