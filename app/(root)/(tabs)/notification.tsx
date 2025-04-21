import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ResponseGetNotification, getNotifications } from "@/api/notification";

interface ItemProps {
    title: string;
    content: string;
    time: string;
}

const isToday = (inputDate: string | Date): boolean => {
    const today = new Date();
    const date = new Date(inputDate);

    return (
        today.getDate() === date.getDate() &&
        today.getMonth() === date.getMonth() &&
        today.getFullYear() === date.getFullYear()
    );
};

const Notification = () => {

    const [notifications, setNotifications] = useState<ResponseGetNotification[]>(
        [{
            _id: "",
            userId: "",
            message: "",
            title: "",
            sentAt: "",
            __v: 0
        }]
    )

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getNotifications();
                setNotifications(response)
            } catch (error) {
                console.error(error)
            }
        }
        fetchNotifications()
    }, []);

    return (
        <SafeAreaView>
            <View className="flex flex-col justify-end items-center">
                <View>
                    <Text className="mt-10 text-2xl font-semibold">Thông báo</Text>
                </View>
                <ScrollView className="gap-4 mt-5 mb-24" contentContainerStyle={{ gap: 16 }}>
                    {notifications
                        .sort((a, b) => {
                            return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime();
                        })
                        .map((notification) => {
                            const date = new Date(notification.sentAt);

                            let formattedTime = notification.sentAt;

                            if (!isNaN(date.getTime())) {
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');

                                formattedTime = isToday(date)
                                    ? `Hôm nay ${hours}:${minutes}`
                                    : `${date.toLocaleDateString("vi-VN")} ${hours}:${minutes}`;
                            }
                            return (
                                <Item key={notification._id} title={notification.title} content={notification.message} time={formattedTime} />
                            );
                        })
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Notification;

const Item: React.FC<ItemProps> = ({ title, content, time }) => {
    return (
        <View className="bg-white w-[90vw] px-8 py-4 rounded-xl">
            <Text className="text-neutral-400">{time}</Text>
            <Text className="font-bold text-md">{title}</Text>
            <Text className="font-medium text-md text-neutral-400">{content}</Text>
        </View>
    )
}