import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SocketProvider } from "./context/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider username={prompt("Enter your username")}>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
