import React, { useState, useEffect } from "react";
import { fetchRooms } from "../Data";
import CardRoomReservation from "../components/CardRoomReservation";
import { Container, Card } from "react-bootstrap";

function Reservation() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch (error) {
      console.log("Error loading rooms:", error);
    }
  };
  return (
    <>
      <Container className="my-4">
        <Card className="shadow-sm">
          <Card.Body>
            <CardRoomReservation rooms={rooms} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Reservation;
