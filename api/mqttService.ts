import mqtt from 'mqtt';

// Thông tin kết nối
const ADAFRUIT_IO_USERNAME = 'khangnguyen2k4';
const ADAFRUIT_IO_KEY = 'aio_fnev41LugFWmzdJcQvX4kjJuexeQ'; // Thay bằng Adafruit IO Key của bạn

// URL WebSocket của Adafruit IO
const MQTT_URL = 'wss://io.adafruit.com:443/mqtt';

// Tạo MQTT Client
const client = mqtt.connect(MQTT_URL, {
    username: ADAFRUIT_IO_USERNAME,
    password: ADAFRUIT_IO_KEY,
});

// Biến lưu trữ các callback nhận dữ liệu từ feed
let onMessageCallback: (topic: string, message: string) => void = () => { };

// Hàm kết nối và đăng ký các topic
export const connectMQTT = () => {
    client.on('connect', () => {
        console.log('✅ MQTT connected successfully!');

        // Đăng ký các feed mà bạn muốn nhận dữ liệu
        const FEED_KEYS = ["assignment.anh-sang", "assignment.do-am", "assignment.nhiet-do"];
        FEED_KEYS.forEach((feed) => {
            const topic = `${ADAFRUIT_IO_USERNAME}/feeds/${feed}`;
            client.subscribe(topic, (err) => {
                if (err) {
                    console.error(`❌ Không thể đăng ký topic ${topic}: `, err);
                } else {
                    console.log(`📡 Đăng ký thành công topic ${topic}`);
                }
            });
        });
    });

    // Khi có tin nhắn mới
    client.on('message', (topic, message) => {
        console.log(`📥 Nhận dữ liệu từ ${topic}: ${message.toString()}`);
        if (message) {
            console.log('📝 Message Payload:', message.toString());
        } else {
            console.log('⚠️ Không có dữ liệu từ message!');
        }

        if (onMessageCallback) {
            onMessageCallback(topic, message.toString());
        }
    });

    // Xử lý kết nối bị mất
    client.on('error', (error) => {
        console.error('❌ Lỗi kết nối MQTT: ', error);
    });
};

// Hàm đăng ký callback
export const setOnMessageCallback = (callback: (topic: string, message: string) => void) => {
    onMessageCallback = callback;
};
