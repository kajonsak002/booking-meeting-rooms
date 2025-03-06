import React from "react";
import { Container } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  return (
    <Container className="py-3 my-4 border-top mx-auto">
      <footer className="d-flex flex-wrap justify-content-between align-items-center">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2024 BKRXXMS , KXJONSXN
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <TwitterIcon fontSize="small" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <InstagramIcon fontSize="small" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <FacebookIcon fontSize="small" />
            </a>
          </li>
        </ul>
      </footer>
    </Container>
  );
}

export default Footer;
