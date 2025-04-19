import axios from 'axios';

const ADAFRUIT_IO_USERNAME = "khangnguyen2k4";
const ADAFRUIT_IO_KEY = "aio_fnev41LugFWmzdJcQvX4kjJuexeQ";

const BASE_URL = 'https://io.adafruit.com/api/v2/khangnguyen2k4/feeds';

const FEED_KEYS = ["assignment.anh-sang", "assignment.do-am", "assignment.nhiet-do"];

export const fetchMultipleFeeds = async (): Promise<SensorDataType> => {
    try {
        const responses = await Promise.all(FEED_KEYS.map((feedKey) =>
            axios.get(`${BASE_URL}/${feedKey}/data?limit=1`, {
                headers: { "X-AIO-Key": ADAFRUIT_IO_KEY },
            })
        ));
        // Chuyển dữ liệu thành object { temperature: 27, humidity: 60, light: 300, pressure: 1012 }
        const data: SensorDataType = {
            light: responses[FEED_KEYS.indexOf("assignment.anh-sang")]?.data[0]?.value || "N/A",
            humidity: responses[FEED_KEYS.indexOf("assignment.do-am")]?.data[0]?.value || "N/A",
            temperature: responses[FEED_KEYS.indexOf("assignment.nhiet-do")]?.data[0]?.value || "N/A"
        };
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ nhiều feed:", error);
        return {} as SensorDataType;
    }
};

export interface SensorDataType {
    temperature: string;
    light: string;
    humidity: string;
}