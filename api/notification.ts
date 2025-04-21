import axios from "axios";
import config from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ResponseGetNotification {
    _id: string;
    userId: string;
    message: string;
    title: string;
    sentAt: string;
    __v: number;
}

export const getNotifications = async (): Promise<ResponseGetNotification[]> => {
    try {
        const token = await AsyncStorage.getItem("token");
        const username = await AsyncStorage.getItem("username")
        const response = await axios.get(`${config.BASE_URL}/notification/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.notifications;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
}