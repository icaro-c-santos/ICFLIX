import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routers from "./Routers/Router";
import { AuthProvider } from "./Context/AuthContext";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <>
      <Routers />
    </>
  );
}

export default App;
