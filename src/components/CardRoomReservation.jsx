import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  Search,
  People,
  LocationOn,
  EventAvailable,
} from "@mui/icons-material";
import BookingModal from "./BookingModal";

function CardRoomReservation({ rooms }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const roomsPerPage = 6;

  // Handle searching and filtering
  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBooking = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  return (
    <Container fluid className="py-5">
      <Row className="mb-4">
        <Col xs={12} md={8} lg={6} className="mx-auto w-100">
          <InputGroup className="shadow-sm">
            <InputGroup.Text className="bg-white border-end-0">
              <Search />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="ค้นหาห้องประชุม..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-start-0"
            />
          </InputGroup>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {currentRooms.map((room) => (
          <Col key={room.room_id}>
            <Card className="h-100 shadow-sm hover-shadow transition">
              <Card.Img
                variant="top"
                src={room.img}
                alt={room.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title className="h4 mb-3 font-weight-bold">
                  {room.name}
                </Card.Title>
                <Card.Text className="text-muted mb-2 d-flex align-items-center">
                  <LocationOn fontSize="small" className="me-2 text-primary" />
                  {room.location}
                </Card.Text>
                <Card.Text className="text-muted mb-3 d-flex align-items-center">
                  <People fontSize="small" className="me-2 text-primary" />
                  ความจุ {room.capacity} คน
                </Card.Text>
                <Button
                  variant="primary"
                  className="mt-auto w-100 py-2 rounded-pill shadow-sm transition"
                  onClick={() => handleBooking(room)}
                  style={{
                    background:
                      "linear-gradient(90deg, #007bff 0%, #6610f2 100%)",
                    border: "none",
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                  }}>
                  <EventAvailable className="me-2" />
                  จองห้อง
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredRooms.length === 0 && (
        <Row className="mt-5">
          <Col xs={12} className="text-center">
            <p className="text-muted fs-5">ไม่พบห้องประชุมที่ตรงกับการค้นหา</p>
          </Col>
        </Row>
      )}

      {totalPages > 1 && (
        <Row className="mt-5">
          <Col xs={12} className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}>
                    <Button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </Col>
        </Row>
      )}

      <BookingModal
        show={showModal}
        onHide={handleCloseModal}
        room={selectedRoom}
      />
    </Container>
  );
}

export default CardRoomReservation;
