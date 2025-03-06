import React, { useState } from "react";
import SideBar from "../Admin/SideBar";
import { CssBaseline, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import UserController from "../Admin/Page/UserController";
import RoomController from "../Admin/Page/RoomController";
import BookingController from "../Admin/Page/BookingController";
import Dashboard from "../Admin/Page/DashBoard";
import HeaderBar from "../Admin/HeaderBar";

function Admin() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <CssBaseline />
      <div className="d-flex vh-100">
        <SideBar isSidebar={isSidebar} />
        <div className="flex-grow-1 d-flex flex-column">
          <HeaderBar />
          <div className="flex-grow-1 overflow-auto">
            <Box m="20px">
              <Routes>
                <Route path="" element={<Dashboard />}></Route>
                <Route path="rooms" element={<RoomController />}></Route>
                <Route path="booking" element={<BookingController />}></Route>
                <Route path="manageUser" element={<UserController />}></Route>
              </Routes>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
