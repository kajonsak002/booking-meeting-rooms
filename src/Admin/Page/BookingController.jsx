import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { Search, Add, Check } from "@mui/icons-material";
import PaginationComponent from "../components/PaginationComponent";
import { fetchBookings } from "../../Data";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";

function BookingController() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const data = await fetchBookings();
      setBookings(data);
    } catch (error) {
      console.log("Error loading bookings:", error);
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.room_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.booked_by.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "อณุมัติ":
        return <Badge bg="success">อณุมัติ</Badge>;
      case "ยกเลิก":
        return <Badge bg="secondary">ยกเลิก</Badge>;
      case "ไม่อณุมัติ":
        return <Badge bg="danger">ไม่อณุมัติ</Badge>;
    }
  };

  return (
    <Container className="mt-4 mx-auto">
      <h2>ประวัติการจองห้องประชุม</h2>

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
                  placeholder="ค้นหาชื่อห้อง ชื่อผู้จอง หรือสถานะการจอง"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 bg-light"
                />
              </InputGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="shadow-sm">
        <Card.Body style={{ height: "450px" }}>
          <Table hover responsive className="text-center">
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>ชื่อห้อง</th>
                <th>ผู้จอง</th>
                <th>วันที่</th>
                <th>เวลาเริ่ม</th>
                <th>เวลาสิ้นสุด</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((booking, index) => (
                  <tr key={booking.id}>
                    <td>{index + 1}</td>
                    <td>{booking.room_name}</td>
                    <td>{booking.booked_by}</td>
                    <td>{booking.date}</td>
                    <td>{booking.start_time}</td>
                    <td>{booking.end_time}</td>
                    <td>
                      <h6>{getStatusBadge(booking.status)}</h6>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    <p>ไม่พบข้อมูลการค้นหา</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <PaginationComponent
        itemsPerPage={itemsPerPage}
        totalItems={filteredBookings.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default BookingController;
