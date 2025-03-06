import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import "./HomePage.css";
import { useState } from "react";
import { LoginContext } from "../LoginContext";
import { useContext } from "react";

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isLogin } = useContext(LoginContext);

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div
      style={{
        backgroundColor: "#c9d6ff",
        background: "linear-gradient(to right, #e2e2e2, #c9d6ff)",
      }}>
      <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        {!showLogin && !showRegister ? (
          <>
            <div className="text-center">
              <h1
                className="display-5 font-weight-bold"
                style={{
                  background:
                    "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  animation: "fadeIn 2s ease-in-out",
                }}>
                ระบบจองห้องประชุม
              </h1>
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#444",
                  animation: "slideUp 1s ease-in-out",
                }}>
                ยินดีต้อนรับสู่ระบบจองห้องประชุม
                ที่คุณสามารถจองห้องได้สะดวกและง่ายดาย
              </p>
            </div>
          </>
        ) : (
          <div className="mx-auto my-3">
            {showLogin && <Login />}
            {showRegister && <Register />}
          </div>
        )}
        {!isLogin && (
          <div
            className="d-flex justify-content-center gap-2 "
            style={{
              fontSize: "1.5rem",
              color: "#444",
              animation: "slideUp 1s ease-in-out",
            }}>
            <button
              className="btn btn-primary rounded-pill px-4 py-2 shadow-sm"
              onClick={openLogin}
              style={{
                background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                border: "none",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}>
              เข้าสู่ระบบ
            </button>
            <button
              className="btn btn-outline-primary rounded-pill px-4 py-2 shadow-sm"
              onClick={openRegister}
              style={{
                borderColor: "#2575fc",
                color: "#2575fc",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background =
                  "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)";
                e.target.style.color = "white";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#2575fc";
                e.target.style.transform = "scale(1)";
              }}>
              ลงทะเบียน
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
