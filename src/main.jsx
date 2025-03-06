import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./Admin/layout.css";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginProvider } from "./LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      {/* <Router basename="651463002/bookings"> */}
      <Router>
        <App />
      </Router>
    </LoginProvider>
  </StrictMode>
);
