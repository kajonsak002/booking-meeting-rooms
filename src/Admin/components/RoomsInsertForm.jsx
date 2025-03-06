import React from "react";
import { Offcanvas, Button, Form, Image, Row, Col } from "react-bootstrap";

function RoomInsertForm({
  show,
  setShow,
  isUpdate,
  setIsUpdate,
  DataRoom,
  setDataRoom,
  handleSubmit,
  imagePreview,
  setImagePreview,
  handleSaveUpdate,
}) {
  const handleClose = () => {
    setShow(false);
    setImagePreview(null);
    setIsUpdate(false);
    setDataRoom({
      room_id: "",
      name: "",
      location: "",
      capacity: "",
      img: "",
      status: "",
    });
  };

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (name === "img" && files.length > 0) {
      setImagePreview(URL.createObjectURL(files[0]));
      setDataRoom((prevData) => ({
        ...prevData,
        img: files[0],
      }));
    } else {
      setDataRoom((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {isUpdate ? "แก้ไขข้อมูลห้อง" : "เพิ่มข้อมูลห้อง"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <pre>{JSON.stringify(DataRoom, null, 2)}</pre> */}
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>ชื่อห้อง</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="ป้อนชื่อห้อง"
                    value={DataRoom.name || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>สถานที่</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="ป้อนสถานที่ห้อง"
                    value={DataRoom.location || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>ความจุ</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity"
                    placeholder="ป้อนความจุ"
                    value={DataRoom.capacity || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formRoomImage">
                  <Form.Label>เลือกรูปภาพ</Form.Label>
                  <Form.Control
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            {(imagePreview || DataRoom.img) && (
              <Row className="mb-3">
                <Col>
                  <div className="mt-3">
                    <Image
                      src={imagePreview || DataRoom.img}
                      alt="ภาพตัวอย่าง"
                      fluid
                    />
                  </div>
                </Col>
              </Row>
            )}
            {isUpdate && (
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formRoomStatus">
                    <Form.Label>สถานะ</Form.Label>
                    <Form.Select
                      name="status"
                      value={DataRoom.status || "true"}
                      onChange={handleChange}>
                      <option value="true">เปิดให้จอง</option>
                      <option value="false">ปิดปรับปรุง</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}
            {isUpdate ? (
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                onClick={(e) => handleSaveUpdate(e)}>
                อัปเดตข้อมูล
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                onClick={handleSubmit}>
                เพิ่มข้อมูล
              </Button>
            )}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default RoomInsertForm;
