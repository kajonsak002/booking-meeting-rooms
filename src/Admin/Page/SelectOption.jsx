import React, { useState, useEffect } from "react";

const DistrictDropdown = () => {
  // สร้าง state เพื่อเก็บค่าที่เลือก
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const district = [
    { id: 1, location_id: "LOC1", name: "District 1" },
    { id: 2, location_id: "LOC2", name: "District 2" },
    { id: 3, location_id: "LOC3", name: "District 3" },
  ];

  // กำหนดค่าเมื่อมีการเปลี่ยนเเปลง Select Option
  const handleChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <div>
      <select value={selectedDistrict} onChange={handleChange}>
        <option value="">Select a district</option>
        {/* loop ค่าใน array */}
        {district.map((district) => (
          <option key={district.id} value={district.name}>
            {district.name}
          </option>
        ))}
      </select>

      {selectedDistrict && (
        <p>
          {/* ค่าที่เลือก */}
          Selected District Location ID: <strong>{selectedDistrict}</strong>
        </p>
      )}
    </div>
  );
};

export default DistrictDropdown;
