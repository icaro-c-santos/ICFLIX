import React from "react";
import { Home } from "../pages/Home/Home";
import { About } from "../pages/About/About";
import { Contact } from "../pages/Contact/Contact";
import { Characters } from "../pages/Characters/Characters";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRouter } from "./ProtectedRouters";
import { AuthProvider } from "../Context/AuthContext";
import { Login } from "../pages/Login/Login";
import ResponsiveAppBar from "../Components/NaveBar/NaveBar";
import { Register } from "../pages/Register/Register";

const Routers = () => {
  return (
    <AuthProvider>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/characters"
            element={
              <ProtectedRouter>
                <Characters />
              </ProtectedRouter>
            }
          />

          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default Routers;
