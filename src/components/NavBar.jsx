import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import Swal from "sweetalert2";
import "./NavBar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HistoryIcon from "@mui/icons-material/History";

function NavBar() {
  const { logout } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: "Logging out...",
      text: "Please wait",
      icon: "info",
      showConfirmButton: false,
      timer: 500,
      timerProgressBar: true,
    }).then(() => {
      localStorage.clear();
      logout();
      window.location.href = "/";
    });
  };

  useEffect(() => {
    setUsername(localStorage.getItem("name"));
  }, []);

  return (
    <Navbar expand="lg" className="navbar-gradient shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ระบบจองห้องประชุม
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/Reservation"
              className={location.pathname === "/Reservation" ? "active" : ""}>
              จองห้องประชุม
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/rooms"
              className={location.pathname === "/rooms" ? "active" : ""}>
              รายละเอียดห้องประชุม
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/booking"
              className={location.pathname === "/booking" ? "active" : ""}>
              ปฏิทินการใช้ห้องประชุมวันนี้
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/bkCalenderAll"
              className={
                location.pathname === "/bkCalenderAll" ? "active" : ""
              }>
              ปฏิทินการใช้ห้องประชุม
            </Nav.Link>
            <Dropdown align="end" className="user-dropdown">
              <Dropdown.Toggle
                id="dropdown-profile"
                className="d-flex align-items-center">
                <AccountCircleIcon className="me-2" />
                <span className="username">{username}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to="/bkHistory"
                  className="dropdown-item-custom">
                  <HistoryIcon className="me-2" />
                  ประวัติการจองห้องประชุม
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={handleLogout}
                  className="dropdown-item-custom">
                  <ExitToAppIcon className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
