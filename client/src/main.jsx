import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./Context";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
