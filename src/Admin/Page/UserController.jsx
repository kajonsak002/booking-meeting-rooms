import React, { useState, useEffect } from "react";
import { fetchUser } from "../../Data";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import UserInsertForm from "../components/UserInsertForm";
import { Search, Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";
import PaginationComponent from "../components/PaginationComponent";

function UserController() {
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [DataUser, setDataUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUser();
      setUsers(data);
    } catch (error) {
      console.log("Error loading users:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleResetPassword = (user) => {
    setIsUpdate(true);
    setDataUser(user.user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", DataUser.name);
    data.append("username", DataUser.username);
    data.append("password", DataUser.password);
    data.append("role", DataUser.role);

    try {
      const res = await axios.post(config.apiAut + "Register.php", data);
      if (res.data.status === "success") {
        loadUsers();
        setShow(false);
        setDataUser({
          id: "",
          name: "",
          username: "",
          password: "",
          role: "",
        });
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: res.data.status,
          title: res.data.message,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: res.data.status,
          title: res.data.message,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.log("Error Insert User:", err);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4 mx-auto">
      <UserInsertForm
        show={show}
        setShow={setShow}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        setDataUser={setDataUser}
        DataUser={DataUser}
        handleSubmit={handleSubmit}
      />
      <h2>จัดการข้อมูลผู้ใช้</h2>
      <Card className="shadow-sm mb-2">
        <Card.Body>
          <Row className="d-flex justify-content-between g-3">
            <Col xs={12} md={7} lg={6}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <Search className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ค้นหาชื่อผู้ใข้"
                  className="border-start-0 bg-light"
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={5} lg={3} className="text-md-end">
              <Button onClick={() => handleShow()} className="w-100">
                <Add /> เพิ่มข้อมูลผู้ใช้
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row className="mt-2">
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body style={{ height: "470px" }}>
              <Table hover responsive className="text-center">
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>ชื่อผู้ใช้</th>
                    <th>ชื่อ-สกุล</th>
                    <th>บทบาท</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <PaginationComponent
        itemsPerPage={itemsPerPage}
        totalItems={filteredUsers.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default UserController;
