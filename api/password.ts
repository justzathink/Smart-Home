import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "@/constants/config";

// const AIO_USERNAME = "khangnguyen2k4";
// const FEED_KEY = "assignment.password";
// const AIO_KEY = "aio_fnev41LugFWmzdJcQvX4kjJuexeQ";

export const getCorrectPin = async (): Promise<string | null> => {
	try {
		// const res = await fetch(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_KEY}/data/last`, {
		//     headers: {
		//         "X-AIO-Key": AIO_KEY
		//     }
		// });
		// const data = await res.json();
		// return data.value;
		const token = await AsyncStorage.getItem("token");
		const res = await axios.get(`${config.BASE_URL}/control/pin`, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return res.data.value;
	} catch (error) {
		console.error("Failed to fetch correct pin:", error);
		return null;
	}
};

export const updateCorrectPin = async (newPin: string): Promise<boolean> => {
	try {
		// const res = await fetch(
		// 	`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_KEY}/data`,
		// 	{
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			"X-AIO-Key": AIO_KEY,
		// 		},
		// 		body: JSON.stringify({ value: newPin }),
		// 	}
		// );

		// return res.ok;
		const token = await AsyncStorage.getItem("token");
		const res = await axios.post(
			`${config.BASE_URL}/control/pin`,
			{ newPin },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
        return res.data.success;
	} catch (error) {
		console.error("Failed to update pin:", error);
		return false;
	}
};
