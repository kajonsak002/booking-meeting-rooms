import { Routes, Route } from "react-router-dom";
import Admin from "./Page/Admin";
import HomePage from "./Page/HomePage";
import NavBar from "./components/NavBar";
import Rooms from "./Page/Rooms";
import Reservation from "./Page/Reservation";
import BookingToday from "./Page/BookingToday";
import { LoginContext } from "./LoginContext";
import { useContext, useEffect } from "react";
import BkHistory from "./Page/BkHistory";
import "./App.css";
import BkCalenderAll from "./components/bkCalenderAll";
import ResetPassword from "./Page/ResetPassword";

function App() {
  const { isLogin, role, setRole } = useContext(LoginContext);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    console.log("isLogin:", isLogin);
    console.log("role:", role);
  }, [isLogin]);

  return (
    <div className="">
      {isLogin && role !== "admin" && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {isLogin === true ? (
          <>
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/Reservation" element={<Reservation />} />
            <Route path="/booking" element={<BookingToday />} />
            <Route path="/bkCalenderAll" element={<BkCalenderAll />} />
            <Route path="/bkHistory" element={<BkHistory />} />
            <Route path="/dashboard/*" element={<Admin />} />
            {/* {role === "admin" ? (
              <Route path="/dashboard/*" element={<Admin />} />
            ) : (
              <Route path="*" element={""} />
            )} */}
          </>
        ) : (
          <Route path="*" element={""} />
        )}
      </Routes>
    </div>
  );
}

export default App;
