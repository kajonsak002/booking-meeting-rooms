import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
} from "react-bootstrap";
import { Person, CalendarEvent, DoorClosed } from "react-bootstrap-icons";
import { Search, Add, Check } from "@mui/icons-material";
import PaginationComponent from "../components/PaginationComponent";
import {
  fetchUserCount,
  fetchRoomCount,
  fetchBookingCountToday,
  fetchBooking,
} from "../../Data";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";

function Dashboard() {
  const [userCount, setUserCount] = useState([]);
  const [roomCount, setRoomCount] = useState([]);
  const [bkCount, setBkCount] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [status, setStatus] = useState({
    id: "",
    status: "",
  });
  const handleStatusChange = (id, newStatus) => {
    setStatus({
      id: id,
      status: newStatus,
    });
  };

  const loadDataCount = async () => {
    try {
      const uCount = await fetchUserCount();
      const rCount = await fetchRoomCount();
      const bkCount = await fetchBookingCountToday();
      const booking = await fetchBooking();

      setUserCount(uCount);
      setRoomCount(rCount);
      setBkCount(bkCount);
      setBookings(booking);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadDataCount();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Data = new FormData();
      Data.append("req", "update");
      Data.append("id", status.id);
      Data.append("status", status.status);

      const res = await axios.post(config.booking, Data);
      console.log(res.data);
      if (res.data.status === "success") {
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
      setStatus({
        id: "",
        status: "",
      });
      loadDataCount();
    } catch (err) {
      console.log("Error Update Status: ", err);
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="g-4">
        <Col xs={12} sm={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <Person fontSize="large" className="text-primary" />
              <Card.Title className="fs-5 mt-2">ผู้ใช้งานทั้งหมด</Card.Title>
              <Card.Text className="fs-1 fw-bold">
                {userCount.userCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <CalendarEvent fontSize="large" className="text-success" />
              <Card.Title className="fs-5 mt-2">จำนวนห้องทั้งหมด</Card.Title>
              <Card.Text className="fs-1 fw-bold">
                {roomCount.roomCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <DoorClosed fontSize="large" className="text-warning" />
              <Card.Title className="fs-5 mt-2">
                จำนวนห้องที่ถูกจองวันนี้
              </Card.Title>
              <Card.Text className="fs-1 fw-bold">{bkCount.bkCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
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
                    <th>การดำเนินการ</th>
                    <th>ยืนยัน</th>
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
                        <td>{booking.status}</td>
                        <td>
                          {booking.status === "รอดำเนินการ" ? (
                            <>
                              <div className="d-flex">
                                <Form.Select
                                  onChange={(e) =>
                                    handleStatusChange(
                                      booking.id,
                                      e.target.value
                                    )
                                  }>
                                  <option value="">เลือกอณุมัติการจอง</option>
                                  <option value="อณุมัติ">อณุมัติ</option>
                                  <option value="ไม่อณุมัติ">ไม่อณุมัติ</option>
                                </Form.Select>
                              </div>
                            </>
                          ) : (
                            <p>สำเร็จ</p>
                          )}
                        </td>
                        <td>
                          {booking.status === "รอดำเนินการ" ? (
                            <Button
                              variant="success"
                              className="me-2 mt-2"
                              onClick={(e) => handleSubmit(e)}>
                              <Check />
                            </Button>
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        <p>ยังไม่มีรายการจองที่รออณุมัติ</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>{" "}
      <PaginationComponent
        itemsPerPage={itemsPerPage}
        totalItems={filteredBookings.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

export default Dashboard;
