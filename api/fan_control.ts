import axios from "axios";

const ADAFRUIT_IO_KEY: string = "aio_Ivvz40pqVzxBR8edvxXd2BgVqBk1";
const BASE_URL: string = "https://io.adafruit.com/api/v2/daVincentius/feeds/bbc-fan";

export const fetchFanSpeed = async (): Promise<number> => {
    try {
        const response = await axios.get(`${BASE_URL}/data`, {
            headers: { 'X-AIO-Key': ADAFRUIT_IO_KEY },
        });
        return parseFloat(response.data[0]?.value) / 100;
    } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu tốc độ quạt:", error);
        return 0;
    }
};

export const updateFanSpeed = async (speed: number): Promise<void> => {
    try {
        await axios.post(`${BASE_URL}/data`, { value: Math.round(speed * 100) }, {
            headers: { 'X-AIO-Key': ADAFRUIT_IO_KEY },
        });
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật tốc độ quạt:", error);
    }
};