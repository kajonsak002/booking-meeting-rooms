import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import "./CardRooms.css";
import { Search } from "@mui/icons-material";

function CardRooms({ rooms }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 5; // จำนวนห้องประชุมที่แสดงในแต่ละหน้า

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="rooms-accordion-container">
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

      <Row className="g-2">
        {currentRooms.map((room) => (
          <Col key={room.room_id} xs={12}>
            <Card className="room-item d-flex flex-row align-items-center p-2">
              <Card.Img
                src={room.img}
                alt={room.name}
                className="img-fluid rounded-start"
                style={{ width: "40%", height: "300px" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <h2 className="fw-bold text-dark m-0">{room.name}</h2>
                  <h5 className="text-dark m-0">{room.location}</h5>
                  <p className="text-muted m-0">ความจุ {room.capacity} คน</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredRooms.length === 0 && (
        <Row>
          <Col xs={12} className="mt-2">
            <p className="text-center text-muted">
              ไม่พบห้องประชุมที่ตรงกับการค้นหา
            </p>
          </Col>
        </Row>
      )}

      {totalPages > 1 && (
        <Row className="mt-3">
          <Col xs={12} className="d-flex justify-content-center">
            <div>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  variant="outline-primary"
                  className={`mx-1 ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CardRooms;
