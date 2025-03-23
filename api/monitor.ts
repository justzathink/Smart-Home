import axios from 'axios';

const ADAFRUIT_IO_USERNAME = "khangnguyen2k4";
const ADAFRUIT_IO_KEY = "aio_krDC18LfvFvN6yyLZl1frcJqckhe";

const BASE_URL = 'https://io.adafruit.com/api/v2/khangnguyen2k4/groups/assignment/feeds';

const FEED_KEYS = ["nhiet-do", "anh-sang"];

export const fetchFeeds = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: { 'X-AIO-Key': ADAFRUIT_IO_KEY },
        });
        return response.data; // Trả về danh sách các feed
    } catch (error) {
        console.error('❌ Lỗi khi lấy danh sách feed:', error);
        return [];
    }
};

export const fetchFeedData = async (feedKey: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${feedKey}/data`, {
            headers: { 'X-AIO-Key': ADAFRUIT_IO_KEY },
        });
        return response.data[0]?.value || 'N/A'; // Trả về giá trị mới nhất
    } catch (error) {
        console.error(`❌ Lỗi khi lấy dữ liệu feed ${feedKey}:`, error);
        return 'N/A';
    }
};

export const fetchMultipleFeeds = async (): Promise<SensorDataType> => {
    try {
        const requests = FEED_KEYS.map((feedKey) =>
            axios.get(`https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/groups/assignment/feeds/${feedKey}/data?limit=1`, {
                headers: { "X-AIO-Key": ADAFRUIT_IO_KEY },
            })
        );

        const responses = await Promise.all(requests);


        // Chuyển dữ liệu thành object { temperature: 27, humidity: 60, light: 300, pressure: 1012 }
        const data: SensorDataType = responses.reduce((result, response, index) => {
            const key = FEED_KEYS[index].toLowerCase() as keyof SensorDataType;
            result[key] = response.data[0]?.value || "N/A";
            return result;
        }, {} as SensorDataType);

        return data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ nhiều feed:", error);
        return {} as SensorDataType;
    }
};

export interface SensorDataType {
    temperature: string;
    light: string;
}