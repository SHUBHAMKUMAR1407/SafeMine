// File: main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js"; // i18n configuration
import { AuthProvider } from "./context/AuthContext.jsx";
import { WorkerProvider } from "./context/WorkerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <WorkerProvider>
        <App />
      </WorkerProvider>
    </AuthProvider>
  </StrictMode>
);
