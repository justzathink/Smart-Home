// api/updateDoorStatus.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "@/constants/config";

// const ADAFRUIT_USERNAME = 'khangnguyen2k4';
// const ADAFRUIT_KEY = 'aio_fnev41LugFWmzdJcQvX4kjJuexeQ';
// const FEED_NAME = 'assignment.pass';

export const updateDoorStatus = async (status: number) => {
	try {
		// const response = await axios.post(
		//   `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds/${FEED_NAME}/data`,
		//   {
		//     value: status,
		//   },
		//   {
		//     headers: {
		//       'X-AIO-Key': ADAFRUIT_KEY,
		//       'Content-Type': 'application/json',
		//     },
		//   }
		// );

		// return response.data;
		const token = await AsyncStorage.getItem("token");
		await axios.post(
			`${config.BASE_URL}/control/door`,
			{ status },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
	} catch (error) {
		console.error("Lỗi khi cập nhật trạng thái cửa lên Adafruit:", error);
		return null;
	}
};
