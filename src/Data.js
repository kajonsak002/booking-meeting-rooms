import axios from "axios";
import config from "./config";

//ดึงข้อมูลห้องประชุม
export async function fetchRooms() {
  try {
    const res = await axios.get(config.apiData + "Rooms.php", {
      params: {
        req: "rooms",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error Fetch Data Rooms: ", err);
  }
}

//ดึงข้อมูลผู้ใช้
export async function fetchUser() {
  try {
    const res = await axios.get(config.apiData + "User.php", {
      params: {
        req: "user",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error Fetch Data Users:", err);
  }
}

//ดึงข้อมูลการจองห้องประชุม
export async function fetchBooking() {
  try {
    const res = await axios.get(config.apiData + "Booking.php", {
      params: {
        req: "booking",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error Fetch Data Users:", err);
  }
}

//ดึงข้อมูลการจองห้องประชุม
export async function fetchBookings() {
  try {
    const res = await axios.get(config.apiData + "Booking.php", {
      params: {
        req: "bookingList",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error Fetch Data Users:", err);
  }
}

//ดึงข้อมูลจำนวน user ทั้งหมด
export async function fetchUserCount() {
  try {
    const res = await axios.get(config.apiData + "User.php", {
      params: {
        req: "userCount",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error Fetch Data Users:", err);
  }
}

//ดึงข้อมูลห้องประชุม
export async function fetchRoomCount() {
  try {
    const res = await axios.get(config.apiData + "Rooms.php", {
      params: {
        req: "roomCount",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error Fetch Data Rooms: ", err);
  }
}

//ดึงข้อมูลจำนวนการจองห้องประชุมวันนี้
export async function fetchBookingCountToday() {
  try {
    const res = await axios.get(config.apiData + "Booking.php", {
      params: {
        req: "bookingCount",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error FetchBookingCountToday: ", err);
  }
}

//ดึงข้อมูลการจองห้องประชุมวันนี้
export async function fetchBookingToday() {
  try {
    const res = await axios.get(config.apiData + "Booking.php", {
      params: {
        req: "bookingToDay",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error FetchBookingCountToday: ", err);
  }
}

//ดึงข้อมูลการจองห้องประชุมที่อณุมัติ
export async function fetchBookingList() {
  try {
    const res = await axios.get(config.apiData + "Booking.php", {
      params: {
        req: "bkCalender",
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error Fetch Data Users:", err);
  }
}
