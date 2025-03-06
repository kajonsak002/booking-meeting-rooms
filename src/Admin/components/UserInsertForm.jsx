import React, { useState } from "react";
import { Offcanvas, Button, Form, Row, Col } from "react-bootstrap";

function UserInsertForm({
  show,
  setShow,
  isUpdate,
  setIsUpdate,
  DataUser,
  setDataUser,
  handleSubmit,
}) {
  const handleClose = () => {
    setShow(false);
    setIsUpdate(false);
    setDataUser({
      id: "",
      name: "",
      username: "",
      password: "",
      role: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {isUpdate ? "แก้ไขข้อมูลผู้ใช้" : "เพิ่มข้อมูลผู้ใช้"}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          {/* <pre>{JSON.stringify(DataUser, null, 2)}</pre> */}
          {isUpdate && (
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                รหัสผู้ใช้
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  name="id"
                  value={DataUser.id}
                  disabled
                  required
                />
              </Col>
            </Form.Group>
          )}

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              ชื่อ-นามสกุล
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="name"
                value={DataUser.name || ""}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              ชื่อผู้ใช้
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="username"
                value={DataUser.username || ""}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              รหัสผ่าน
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="password"
                name="password"
                value={DataUser.password || ""}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              บทบาท
            </Form.Label>
            <Col sm="8">
              <Form.Select
                className="form-select"
                name="role"
                value={DataUser.role || ""}
                onChange={handleChange}
                required>
                <option value="">เลือกบทบาท</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Col>
          </Form.Group>

          {isUpdate ? (
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              onClick={() => alert("Update Data")}>
              อัปเดตข้อมูล
            </Button>
          ) : (
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              onClick={(e) => handleSubmit(e)}>
              เพิ่มข้อมูล
            </Button>
          )}
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default UserInsertForm;
