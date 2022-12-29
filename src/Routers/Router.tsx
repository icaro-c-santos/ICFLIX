import React from "react";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Movies } from "../pages/Movies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRouter } from "./ProtectedRouters";
import { AuthProvider } from "../Context/AuthContext";
import { Login } from "../pages/Login";
import ResponsiveAppBar from "../Components/NaveBar/NaveBar";
import { Register } from "../pages/Register";

const Routers = () => {
  return (
    <AuthProvider>
      <Router>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouter>
                <Movies />
              </ProtectedRouter>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default Routers;
