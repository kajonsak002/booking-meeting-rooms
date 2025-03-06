import React, { useState, useEffect } from "react";
import { Container, Form, Card } from "react-bootstrap";
import CardRooms from "../components/CardRooms";
import { fetchRooms } from "../Data";

function Rooms() {
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
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Body>
          <CardRooms rooms={rooms} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Rooms;
