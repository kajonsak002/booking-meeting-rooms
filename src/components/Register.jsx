import React, { useContext, useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import config from "../config";
import { LoginContext } from "../LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

function Register() {
  const { login } = useContext(LoginContext);
  const [regData, setRegData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const register = new FormData();
      register.append("name", regData.name);
      register.append("username", regData.username);
      register.append("password", regData.password);

      const res = await axios.post(config.apiAut + "Register.php", register);

      if (res.data.status === "success") {
        Swal.fire({
          title: res.data.message,
          icon: res.data.status,
          text: "เข้าสู่ระบบสำเร็จ ยินดีต้อนรับคุณ " + res.data.name,
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("role", res.data.role);
          login();
          navigate("/rooms");
        });
      } else {
        Swal.fire({
          position: "center",
          icon: res.data.status,
          title: res.data.message,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error register:", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh">
      <Card className="shadow-lg" style={{ maxWidth: "900px", width: "100%" }}>
        <Row className="g-0">
          <Col md={6}>
            <Card.Body className="p-5">
              <h2 className="text-center mb-4 text-primary">ลงทะเบียน</h2>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Control
                    type="text"
                    placeholder="ชื่อ-นามสกุล"
                    value={regData.name}
                    onChange={(e) =>
                      setRegData({ ...regData, name: e.target.value })
                    }
                    required
                    className="border-0 border-bottom rounded-0 shadow-none"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Control
                    type="text"
                    placeholder="ชื่อผู้ใช้"
                    value={regData.username}
                    onChange={(e) =>
                      setRegData({ ...regData, username: e.target.value })
                    }
                    required
                    className="border-0 border-bottom rounded-0 shadow-none"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Control
                    type="password"
                    placeholder="รหัสผ่าน"
                    value={regData.password}
                    onChange={(e) =>
                      setRegData({ ...regData, password: e.target.value })
                    }
                    required
                    className="border-0 border-bottom rounded-0 shadow-none"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 rounded-pill"
                  style={{
                    background:
                      "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                  }}>
                  ลงทะเบียน
                </Button>
              </Form>
            </Card.Body>
          </Col>
          <Col
            md={6}
            className="bg-primary text-white d-flex align-items-center">
            <div className="text-center p-5">
              <AppRegistrationIcon style={{ fontSize: 80, marginBottom: 20 }} />
              <h3>ยินดีต้อนรับ</h3>
              <p>ลงทะเบียนเพื่อเข้าสู่ระบบ ของเรา</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Register;
