import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup, Alert } from "react-bootstrap";
import config from "../config";
import axios from "axios";
import Swal from "sweetalert2";

function BookingModal({ show, onHide, room }) {
  const [username, setUsername] = useState(localStorage.getItem("name"));
  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState({
    booked_by: username,
    date: "",
    startTime: "",
    endTime: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("th-TH", options);
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  const fetchAvailableTimes = async (roomId, date) => {
    try {
      const data = new FormData();
      data.append("roomId", roomId);
      data.append("date", selectedDate);
      const res = await axios.post(config.availableTimes, data);
      setAvailableTimes(res.data.availableTimes);
      console.log(res.data.availableTimes);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  const handleFetchAvailableTimes = () => {
    if (!selectedDate) {
      setError("กรุณาเลือกวันที่ก่อนที่จะค้นหาช่วงเวลาว่าง");
      return;
    }
    setError("");
    fetchAvailableTimes(room.room_id, selectedDate);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bookingData.startTime >= bookingData.endTime) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด",
        text: "เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด",
        showConfirmButton: true,
      });
      return;
    }

    const data = new FormData();
    data.append("req", "insert");
    data.append("roomId", room.room_id);
    data.append("date", bookingData.date);
    data.append("startTime", bookingData.startTime);
    data.append("endTime", bookingData.endTime);
    data.append("booker", bookingData.booked_by);

    try {
      const res = await axios.post(config.booking, data);
      if (res.data.status === "success") {
        Swal.fire({
          icon: res.data.status,
          title: "สำเร็จ",
          text: res.data.message,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
        setBookingData({
          booked_by: username,
          date: new Date().toISOString().split("T")[0],
          startTime: "",
          endTime: "",
        });
        onHide();
      } else {
        Swal.fire({
          icon: res.data.status,
          title: "เกิดข้อผิดพลาด",
          text: res.data.message,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.log("Error Booking Room: ", err);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>จองห้องประชุม: {room?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Label>เลือกวันที่</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleFetchAvailableTimes}>
            ค้นหาช่วงเวลาว่าง
          </Button>
          {availableTimes.length > 0 && (
            <div className="mt-3">
              <h5>ช่วงเวลาว่าง วันที่ {formatDate(selectedDate)} </h5>
              <ul>
                {availableTimes.map((time, index) => (
                  <li key={index}>
                    {time.start_time} - {time.end_time}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Form.Group className="mb-3 mt-4">
            <Form.Label>ชื่อผู้จอง</Form.Label>
            <Form.Control
              type="text"
              name="booked_by"
              value={bookingData.booked_by}
              onChange={handleInputChange}
              disabled
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>วันที่</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={bookingData.date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>เวลาเริ่มต้น</Form.Label>
            <Form.Control
              type="time"
              name="startTime"
              value={bookingData.startTime}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>เวลาสิ้นสุด</Form.Label>
            <Form.Control
              type="time"
              name="endTime"
              value={bookingData.endTime}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            ยกเลิก
          </Button>
          <Button variant="primary" type="submit">
            ยืนยันการจอง
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default BookingModal;
