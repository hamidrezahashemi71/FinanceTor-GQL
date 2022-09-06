import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ApolloClient from "./apoll-client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloClient>
      <App />
    </ApolloClient>
  </React.StrictMode>
);
