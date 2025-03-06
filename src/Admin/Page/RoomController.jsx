import React, { useEffect, useState } from "react";
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
import { Search, Add, Edit, Delete } from "@mui/icons-material";
import RoomInsertForm from "../components/RoomsInsertForm";
import PaginationComponent from "../components/PaginationComponent";
import axios from "axios";
import config from "../../config";
import { fetchRooms } from "../../Data";
import Swal from "sweetalert2";
import { CheckCircle, Cancel } from "@mui/icons-material";

function RoomController() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [rooms, setRooms] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [DataRoom, setDataRoom] = useState({
    room_id: "",
    name: "",
    location: "",
    capacity: "",
    img: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch (error) {
      console.log("Error loading users:", error);
    }
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdate = (room) => {
    handleShow();
    setIsUpdate(true);
    setDataRoom(room);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomsForm = new FormData();
    roomsForm.append("req", "insert");
    roomsForm.append("name", DataRoom.name);
    roomsForm.append("location", DataRoom.location);
    roomsForm.append("capacity", DataRoom.capacity);
    roomsForm.append("img", DataRoom.img);
    try {
      const res = await axios.post(
        config.room + "RoomsController.php",
        roomsForm
      );
      loadRooms();
      setShow(false);
      setDataRoom({
        room_id: "",
        name: "",
        location: "",
        capacity: "",
        img: "",
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
    } catch (err) {
      console.log("Error Insert Data Rooms:", err);
    }
  };

  const handleDelete = async (roomID, roomName) => {
    try {
      const result = await Swal.fire({
        title: "ยืนยันการลบ",
        text: "คุณแน่ใจว่าจะลบห้อง " + roomName,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        const data = new FormData();
        data.append("req", "delete");
        data.append("room_id", roomID);
        const res = await axios.post(config.room + "RoomsController.php", data);
        loadRooms();
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
      console.log("Error Delete Data :", err);
    }
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    const roomsForm = new FormData();
    roomsForm.append("req", "update");
    roomsForm.append("room_id", DataRoom.room_id);
    roomsForm.append("name", DataRoom.name);
    roomsForm.append("location", DataRoom.location);
    roomsForm.append("capacity", DataRoom.capacity);
    roomsForm.append("img", DataRoom.img);
    roomsForm.append("status", DataRoom.status);

    try {
      const res = await axios.post(
        config.room + "RoomsController.php",
        roomsForm
      );
      loadRooms();
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: res.data.status,
        title: res.data.message,
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).then(() => {
        setShow(false);
        setDataRoom({
          room_id: "",
          name: "",
          location: "",
          capacity: "",
          img: "",
          status: "",
        });
        setIsUpdate(false);
      });
    } catch (err) {
      console.log("Error Update Data Rooms:", err);
    }
  };

  return (
    <Container className="mt-4 mx-auto">
      <RoomInsertForm
        show={show}
        isUpdate={isUpdate}
        setShow={setShow}
        setIsUpdate={setIsUpdate}
        DataRoom={DataRoom}
        setDataRoom={setDataRoom}
        handleSubmit={handleSubmit}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleSaveUpdate={handleSaveUpdate}
      />

      <h2>จัดการข้อมูลห้องประชุม</h2>
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
                  placeholder="ค้นหาชื่อห้องหรือสถานที่"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 bg-light"
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={5} lg={3} className="text-md-end">
              <Button onClick={() => handleShow()} className="w-100">
                <Add /> เพิ่มข้อมูลห้องประชุม
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="shadow-sm">
        <Card.Body style={{ height: "auto" }}>
          <Table hover responsive className="text-center">
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>ชื่อห้อง</th>
                <th>รูปภาพ</th>
                <th>สถานที่</th>
                <th>รองรับได้</th>
                <th>สถานะ</th>
                <th>การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((room, index) => (
                <tr key={room.room_id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{room.name}</td>
                  <td>
                    <img
                      src={room.img}
                      alt={room.name}
                      width="150px"
                      height="auto"
                      className="img-fluid rounded"
                    />
                  </td>
                  <td>{room.location}</td>
                  <td>{room.capacity}</td>
                  <td>
                    <span
                      className={`badge ${
                        room.status === "true" ? "bg-success" : "bg-danger"
                      }`}>
                      {room.status === "true" ? (
                        <className>
                          <CheckCircle fontSize="small" className="me-1 m" />
                          เปิดให้จอง
                        </className>
                      ) : (
                        <>
                          <Cancel fontSize="small" className="me-1" />
                          ปิดปรับปรุง
                        </>
                      )}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleUpdate(room)}
                      className="mx-1 mb-2 mb-md-0">
                      <Edit fontSize="small" /> แก้ไข
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(room.room_id, room.name)}>
                      <Delete fontSize="small" /> ลบ
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <PaginationComponent
        itemsPerPage={itemsPerPage}
        totalItems={filteredRooms.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default RoomController;
