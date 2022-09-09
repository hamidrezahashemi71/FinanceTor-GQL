import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ApolloClient from "./apoll-client";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {DataProvider} from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloClient>
      <DataProvider>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <App />
      </DataProvider>
    </ApolloClient>
  </React.StrictMode>
);
