import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routers from "./Routers/Router";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <>
      <Routers />
    </>
  );
}

export default App;
