import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routers from "./Routers/Router";
import { AuthProvider } from "./Context/AuthContext";
import { Home } from "./pages/Home/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import TagManager from 'react-gtm-module';

const TagManagerArgs = {
  gtmId:"UA-213515478-2",
  dataLayer:{
    userId:"11",
    userProject:"ICFLIX"
  }
}

TagManager.initialize(TagManagerArgs);

function App() {
  return (
    <>
      {" "}
      <GoogleOAuthProvider clientId="1062964220836-n55t0p6fr7cvrh93drovlqcv47ddiofa.apps.googleusercontent.com">
        <Routers />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
