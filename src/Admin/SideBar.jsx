import React, { useState, useContext } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupIcon from "@mui/icons-material/Group";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Logout } from "@mui/icons-material";
import { LoginContext } from "../LoginContext";
import Swal from "sweetalert2";

const SideBar = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const { logout } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logging out...",
      text: "Please wait",
      icon: "info",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    }).then(() => {
      localStorage.clear();
      logout();
      window.location.href = "/";
    });
  };

  return (
    <div
      bg="white"
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "white",
      }}>
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        style={{ height: "100%" }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                }}>
                {!isCollapsed && (
                  <Box>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography sx={{ m: "10px 0 0 0" }}>Admin</Typography>
                  </Box>
                </Box>
              )}

              {/* MENU ITEMS */}
              <MenuItem
                icon={<DashboardIcon />}
                onClick={() => navigate("/dashboard")}>
                Dashboard
              </MenuItem>

              <SubMenu icon={<MeetingRoomIcon />} label="Manage">
                <MenuItem
                  icon={<MeetingRoomIcon />}
                  onClick={() => navigate("/dashboard/rooms")}>
                  Rooms
                </MenuItem>
                <MenuItem
                  icon={<EventAvailableIcon />}
                  onClick={() => navigate("/dashboard/booking")}>
                  Booking
                </MenuItem>{" "}
                <MenuItem
                  icon={<ManageAccountsIcon />}
                  onClick={() => navigate("/dashboard/manageUser")}>
                  User
                </MenuItem>
              </SubMenu>
              <MenuItem icon={<Logout />} onClick={() => handleLogout()}>
                ออกจากระบบ
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ marginBottom: "16px" }}>
          {broken && (
            <IconButton onClick={() => setToggled(!toggled)}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
        </div>
      </main>
    </div>
  );
};

export default SideBar;
