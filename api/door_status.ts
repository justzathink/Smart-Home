// api/updateDoorStatus.ts
import axios from "axios";

const ADAFRUIT_USERNAME = 'khangnguyen2k4';
const ADAFRUIT_KEY = 'aio_fnev41LugFWmzdJcQvX4kjJuexeQ';
const FEED_NAME = 'assignment.password';

export const updateDoorStatus = async (status: number) => {
  try {
    const response = await axios.post(
      `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds/${FEED_NAME}/data`,
      {
        value: status,
      },
      {
        headers: {
          'X-AIO-Key': ADAFRUIT_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái cửa lên Adafruit:", error);
    return null;
  }
};
