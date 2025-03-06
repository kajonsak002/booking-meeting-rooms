import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { AccountCircle, Lock, Refresh } from "@mui/icons-material";
import axios from "axios";
import config from "../config";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function ResetPassword() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const data = new FormData();
      data.append("username", username);
      const response = await axios.post(
        config.apiAut + "ResetPassword.php",
        data
      );
      if (response.data.status === "success") {
        setStep(2);
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    try {
      const data = new FormData();
      data.append("username", username);
      data.append("newPassword", newPassword);
      const response = await axios.post(config.apiAut + "UpdatePass.php", data);
      if (response.data.status === "success") {
        setSuccess(response.data.message);
        window.location.href = "/";
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการอัพเดทรหัสผ่าน");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4 text-primary">รีเซ็ตรหัสผ่าน</h2>
          {error && (
            <Alert variant="danger" className="mb-3">
              <div className="d-flex align-items-center">
                <ErrorOutlineIcon className="me-2" />
                <span>{error}</span>
              </div>
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-3">
              <div className="d-flex align-items-center">
                <CheckCircleOutlineIcon className="me-2" />
                <span>{success}</span>
              </div>
            </Alert>
          )}
          {step === 1 ? (
            <Form onSubmit={handleUsernameSubmit}>
              <Form.Group className="mb-4" controlId="formUsername">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 border-bottom">
                    <AccountCircle color="primary" />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="ชื่อผู้ใช้"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border-0 border-bottom rounded-0 shadow-none"
                  />
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 rounded-pill"
                style={{
                  background:
                    "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                }}>
                ขอรีเซ็ตรหัสผ่าน
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleNewPasswordSubmit}>
              <Form.Group className="mb-3" controlId="formNewPassword">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 border-bottom">
                    <Lock color="primary" />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="รหัสผ่านใหม่"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="border-0 border-bottom rounded-0 shadow-none"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formConfirmPassword">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0 border-bottom">
                    <Lock color="primary" />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border-0 border-bottom rounded-0 shadow-none"
                  />
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 rounded-pill"
                style={{
                  background:
                    "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                }}>
                อัพเดทรหัสผ่าน
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ResetPassword;
