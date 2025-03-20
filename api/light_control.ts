import axios from "axios";

const ADAFRUIT_IO_KEY: string = "aio_krDC18LfvFvN6yyLZl1frcJqckhe";
const BASE_URL: string = "https://io.adafruit.com/api/v2/khangnguyen2k4/feeds/assignment.den";

export const fetchLEDStatus = async (): Promise<boolean> => {
    try {
        const response = await axios.get(`${BASE_URL}/data`, {
            headers: { 'X-AIO-Key': ADAFRUIT_IO_KEY },
        });
        return response.data[0]?.value === "1";
    } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu trạng thái LED:", error);
        return false;
    }
};

export const updateLEDStatus = async (status: boolean): Promise<void> => {
    try {
        await axios.post(`${BASE_URL}/data`, { value: status ? "1" : "0" }, {
            headers: { 'X-AIO-Key': ADAFRUIT_IO_KEY },
        });
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật trạng thái LED:", error);
    }
};