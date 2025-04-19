

const AIO_USERNAME = "khangnguyen2k4";
const FEED_KEY = "assignment.password";
const AIO_KEY = "aio_fnev41LugFWmzdJcQvX4kjJuexeQ";

export const getCorrectPin = async (): Promise<string | null> => {
    try {
        const res = await fetch(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_KEY}/data/last`, {
            headers: {
                "X-AIO-Key": AIO_KEY
            }
        });
        const data = await res.json();
        return data.value;
    } catch (error) {
        console.error("Failed to fetch correct pin:", error);
        return null;
    }
};

export const updateCorrectPin = async (newPin: string): Promise<boolean> => {
    try {
        const res = await fetch(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_KEY}/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-AIO-Key": AIO_KEY
            },
            body: JSON.stringify({ value: newPin })
        });

        return res.ok;
    } catch (error) {
        console.error("Failed to update pin:", error);
        return false;
    }
};
