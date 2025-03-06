import axios from "axios";
import React, { useState, useContext } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../config";
import Swal from "sweetalert2";
import { LoginContext } from "../LoginContext";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

function Login() {
  const { login } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("username", formData.username);
    userData.append("password", formData.password);

    try {
      const res = await axios.post(config.apiAut + "Login.php", userData);
      if (res.data.status === "success") {
        Swal.fire({
          title: res.data.message,
          icon: res.data.status,
          text: "เข้าสู่ระบบสำเร็จ ยินดีต้อนรับคุณ " + res.data.name,
          timer: 500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("role", res.data.role);
          login();
          if (res.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/rooms");
          }
        });
      } else {
        Swal.fire({
          position: "center",
          icon: res.data.status,
          title: res.data.message,
          showConfirmButton: false,
          timer: 500,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.log("Error Login:", err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card className="shadow-lg" style={{ maxWidth: "900px", width: "100%" }}>
        <Row className="g-0">
          <Col md={6}>
            <Card.Body className="p-5">
              <h2 className="text-center mb-4 text-primary">เข้าสู่ระบบ</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="ชื่อผู้ใช้"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="border-0 border-bottom rounded-0 shadow-none"
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="รหัสผ่าน"
                    value={formData.password}
                    onChange={handleChange}
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
                  เข้าสู่ระบบ
                </Button>
                <div className="text-center mt-2">
                  <a
                    href="reset-password"
                    className="text-decoration-none text-muted">
                    ลืมรหัสผ่าน?
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Col>
          <Col
            md={6}
            className="bg-primary text-white d-flex align-items-center">
            <div className="text-center p-5">
              <MeetingRoomIcon style={{ fontSize: 80, marginBottom: 20 }} />
              <h3>ยินดีต้อนรับกลับ</h3>
              <p>เข้าสู่ระบบเพื่อใช้งานการจองห้อง</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Login;
