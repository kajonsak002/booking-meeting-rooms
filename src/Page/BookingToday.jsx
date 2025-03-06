import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, Card, Container } from "react-bootstrap";
import { fetchBookingToday } from "../Data";
import "./Calender.css";

function BookingToday() {
  const [events, setEvents] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const data = await fetchBookingToday();
      const formattedEvents = data.map((event) => ({
        title: `ห้อง: ${event.room_name} - จองโดย: ${event.booked_by}`,
        start: `${event.date}T${event.start_time}`,
        end: `${event.date}T${event.end_time || event.start_time}`,
        date: event.date,
        extendedProps: {
          description: `Room จองโดย ${event.booked_by}`,
          status: event.status || "Pending",
        },
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.log("Error loading bookings:", error);
    }
  };

  const handleDateClick = (info) => {
    const bookingsForDate = events.filter(
      (event) => event.date === info.dateStr
    );
    setSelectedBookings(bookingsForDate);
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mx-auto my-3">
      <Card style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "",
          }}
          events={events}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
        />
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>ข้อมูลการจองห้องวันที่ {selectedDate}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBookings.length > 0 ? (
              selectedBookings.map((booking, index) => (
                <div key={index} className="booking-detail">
                  <h5>{booking.title}</h5>
                  <p>
                    <strong>เริ่มเวลา:</strong> {booking.start.split("T")[1]}{" "}
                    <br />
                    <strong>สิ้นสุดเวลา:</strong> {booking.end.split("T")[1]}
                  </p>
                </div>
              ))
            ) : (
              <p>ยังไม่มีการจองห้องประชุมวันนี้</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              ปิด
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </Container>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className="custom-event-content">
      <div className="event-title">{eventInfo.event.title}</div>
    </div>
  );
}

export default BookingToday;
