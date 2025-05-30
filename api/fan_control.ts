import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "@/constants/config";

const ADAFRUIT_IO_KEY: string = "aio_krDC18LfvFvN6yyLZl1frcJqckhe";
const BASE_URL: string =
	"https://io.adafruit.com/api/v2/khangnguyen2k4/feeds/assignment.quat";

export const fetchFanSpeed = async (): Promise<number> => {
	try {
		// const response = await axios.get(`${BASE_URL}/data`, {
		//     headers: { 'X-AIO-Key': ADAFRUIT_IO_KEY },
		// });
		// return parseFloat(response.data[0]?.value) / 100;
		const token = await AsyncStorage.getItem("token");
		const response = await axios.get(`${config.BASE_URL}/control/fan`, {
			headers: { Authorization: `Bearer ${token}` },
		});
        return parseFloat(response.data.value)/100;
	} catch (error) {
		console.error("❌ Lỗi khi lấy dữ liệu tốc độ quạt:", error);
		return 0;
	}
};

export const updateFanSpeed = async (speed: number): Promise<void> => {
	try {
		// await axios.post(
		// 	`${BASE_URL}/data`,
		// 	{ value: Math.round(speed * 100) },
		// 	{
		// 		headers: { "X-AIO-Key": ADAFRUIT_IO_KEY },
		// 	}
		// );
        const token = await AsyncStorage.getItem("token");
		await axios.post(
			`${config.BASE_URL}/control/fan`,
			{ speed },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
	} catch (error) {
		console.error("❌ Lỗi khi cập nhật tốc độ quạt:", error);
	}
};