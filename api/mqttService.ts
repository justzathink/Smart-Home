import mqtt from 'mqtt';

const ADAFRUIT_IO_USERNAME = "NguyenTienPhat";
const ADAFRUIT_IO_KEY = "aio_LxnU78vkNdZhZ5rUF5recTNNoI6D";
const TOPIC = "NguyenTienPhat/groups/dadn-test";

const MQTT_BROKER = `wss://io.adafruit.com:443/mqtt`;

let client: mqtt.MqttClient | null = null;

export const connectMqtt = (onMessage: (feed: string, msg: string) => void) => {
    if (client) return;

    client = mqtt.connect(MQTT_BROKER, {
        username: ADAFRUIT_IO_USERNAME,
        password: ADAFRUIT_IO_KEY
    });

    client.on('connect', () => {
        console.log(`Connected MQTT`);
        client?.subscribe(TOPIC, (error) => {
            if (!error) console.log(`Subscribed: ${TOPIC}`);
        });
    });

    client.on('message', (topic, payload) => {
        const message = payload.toString();
        console.log(`Data from ${topic}:`, message);
        const feed = topic.split('/').pop() || 'unknown_feed';
        onMessage(feed, message);
    });

    client.on('error', (error) => console.error(error));
};

export const disconnetMqtt = () => {
    if (client) {
        client.end();
        client = null;
        console.log("Disconnect MQTT");
    }
};