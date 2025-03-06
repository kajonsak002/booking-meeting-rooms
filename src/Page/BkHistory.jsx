import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import config from "../config";
import { LoginContext } from "../LoginContext";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import Swal from "sweetalert2";

const BkHistory = () => {
  const { username } = useContext(LoginContext);
  const [data, setData] = useState([]);

  const getBkHistory = async () => {
    if (!username) {
      console.log("Username is not set.");
      return;
    }

    try {
      const res = await axios.get(config.apiData + "Booking.php", {
        params: {
          req: "bkHistory",
          username: username,
        },
      });
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log("Error Load Data:", err);
    }
  };

  useEffect(() => {
    if (username) {
      getBkHistory();
    }
  }, [username]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "อณุมัติ":
        return "success";
      case "รอดำเนินการ":
        return "warning";
      case "ยกเลิก":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getBkDetail = async (bkId) => {
    const data = new FormData();
    data.append("location_id", location.location_id);
    const res = await axios.post("");
    console.log(res.data);

    const handleCardClick = async (bkId) => {};

    const handleCancle = async (bkId) => {
      try {
        const result = await Swal.fire({
          title: "ยืนยันการยกเลิกการจองห้อง",
          text: "คุณแน่ใจว่าจะยกเลิกจองห้อง ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ใช่, ยกเลิกเลย!",
          cancelButtonText: "ยกเลิก",
        });
        const data = new FormData();
        data.append("id", bkId);
        data.append("req", "cancel");
        data.append("status", "ยกเลิก");
        const res = await axios.post(config.booking, data);
        if (result.isConfirmed) {
          if (res.data.status === "success") {
            Swal.fire({
              icon: res.data.status,
              title: "ยกเลิกการจองห้อง",
              text: res.data.message,
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            });
            getBkHistory();
          }
        }
      } catch (err) {
        console.log("Error Cacel BookingRooms:", err);
      }
    };

    return (
      <Container className="mt-4 mx-auto">
        {data.length > 0 ? (
          data.map((booking) => {
            return (
              <Row key={booking.id} className="mb-4">
                <Col>
                  <Card className="booking-card p-2">
                    <Row className="g-0">
                      <Col xs={12} md={4}>
                        <Card.Img
                          src={booking.room_img}
                          alt={booking.room_name}
                          className="booking-card-img"
                        />
                      </Col>
                      <Col xs={12} md={8}>
                        <Card.Body className="d-flex flex-column h-100">
                          <Card.Title className="fw-bold mb-3">
                            {booking.room_name}
                          </Card.Title>
                          <Card.Text className="mb-2">
                            <PersonIcon fontSize="small" className="me-2" />
                            {booking.booked_by}
                          </Card.Text>
                          <Card.Text className="mb-2">
                            <CalendarTodayIcon
                              fontSize="small"
                              className="me-2"
                            />
                            {booking.date}
                          </Card.Text>
                          <Card.Text className="mb-2">
                            <AccessTimeIcon fontSize="small" className="me-2" />
                            {booking.start_time} - {booking.end_time}
                          </Card.Text>
                          <div className="mt-auto d-flex justify-content-between">
                            <Badge
                              bg={getStatusColor(booking.status)}
                              className="booking-status p-2">
                              {booking.status}
                            </Badge>
                            {booking.status === "รอดำเนินการ" ? (
                              <div
                                className="btn btn-danger"
                                onClick={() => handleCancle(booking.id)}>
                                ยกเลิกการจอง
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            );
          })
        ) : (
          <Card className="text-center p-5">
            <Card.Body>
              <Card.Text className="text-muted">ยังไม่พบข้อมูลการจอง</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    );
  };
};
export default BkHistory;
