import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routers from "./Routers/Router";
import { AuthProvider } from "./Context/AuthContext";
import { Home } from "../src/pages/Home";

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
