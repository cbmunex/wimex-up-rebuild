// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import awsMock from "./aws-mock";

// Se rodar localmente → usa Cognito REAL
// Se rodar no Amplify → usa Cognito FAKE
const isLocalhost = window.location.hostname === "localhost";
Amplify.configure(isLocalhost ? awsExports : awsMock);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


