import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";

function HeaderBar() {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="shadow-sm m-0">
        <Container fluid style={{ height: "50px" }}></Container>
      </Navbar>
    </div>
  );
}

export default HeaderBar;
