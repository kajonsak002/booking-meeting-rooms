import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedIsLogin = localStorage.getItem("isLogin") === "true";
    const storedRole = localStorage.getItem("role") || "";
    const storedUsername = localStorage.getItem("name") || "";

    setIsLogin(storedIsLogin);
    setRole(storedRole);
    setUsername(storedUsername);
  }, []);

  const login = () => {
    setRole(localStorage.getItem("role"));
    setIsLogin(true);
    setUsername(localStorage.getItem("name"));
    localStorage.setItem("isLogin", "true");
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.clear();
  };

  return (
    <LoginContext.Provider
      value={{ isLogin, login, logout, role, setRole, username }}>
      {children}
    </LoginContext.Provider>
  );
};
