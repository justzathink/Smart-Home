import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ItemProps {
    content: string;
    time: string;
}

const notificationData = [
    { content: "Có người đột nhập", time: "2025-04-19T12:00:00" },
    { content: "Cháy nhà", time: "2025-04-19T13:00:00" },
    { content: "Lũ lụt tại khu vực A", time: "2025-04-19T14:30:00" },
    { content: "Cảnh báo bão lớn", time: "2025-04-19T15:00:00" },
    { content: "Trạm xăng hết xăng", time: "2025-04-19T16:10:00" },
    { content: "Lỗi hệ thống mạng", time: "2025-04-19T17:15:00" },
    { content: "Bảo trì điện lưới", time: "2025-04-19T18:00:00" },
    { content: "Sự cố giao thông trên đường X", time: "2025-04-20T07:45:00" },
    { content: "Tắc đường khu vực trung tâm", time: "2025-04-20T08:15:00" },
    { content: "Mất điện tại quận Y", time: "2025-04-20T09:00:00" },
    { content: "Có vụ tai nạn xe", time: "2025-04-20T10:30:00" },
    { content: "Hệ thống tòa nhà bị lỗi", time: "2025-04-20T11:00:00" },
    { content: "Có thể có bão", time: "2025-04-20T11:45:00" },
    { content: "Cập nhật chính sách mới", time: "2025-04-20T12:00:00" },
    { content: "Thông báo từ cơ quan thuế", time: "2025-04-20T13:30:00" },
    { content: "Phát hiện vi phạm an ninh", time: "2025-04-20T14:00:00" },
    { content: "Điều chỉnh giá xăng dầu", time: "2025-04-20T15:00:00" },
    { content: "Sửa chữa đường phố A", time: "2025-04-20T16:00:00" },
    { content: "Thông báo sự kiện hội nghị", time: "2025-04-20T17:00:00" },
    { content: "Có tin đồn về sản phẩm mới", time: "2025-04-20T18:30:00" },
    { content: "Thông báo về dịch bệnh", time: "2025-04-20T19:00:00" }
];

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
    return (
        <SafeAreaView>
            <View className="flex flex-col justify-end items-center">
                <View>
                    <Text className="mt-10 text-2xl font-semibold">Thông báo</Text>
                </View>
                <ScrollView className="gap-4 mt-5 mb-24" contentContainerStyle={{ gap: 16 }}>
                    {notificationData
                        .sort((a, b) => {
                            return new Date(a.time).getTime() - new Date(b.time).getTime();
                        })
                        .map((notification) => {
                            const date = new Date(notification.time);

                            let formattedTime = notification.time;

                            if (!isNaN(date.getTime())) {
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');

                                formattedTime = isToday(date)
                                    ? `Hôm nay ${hours}:${minutes}`
                                    : `${date.toLocaleDateString("vi-VN")} ${hours}:${minutes}`;
                            }
                            return (
                                <Item key={notification.time} content={notification.content} time={formattedTime} />
                            );
                        })
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Notification;

const Item: React.FC<ItemProps> = ({ content, time }) => {
    return (
        <View className="bg-white w-[90vw] px-8 py-4 rounded-xl">
            <Text className="text-neutral-400">{time}</Text>
            <Text className="font-medium text-md">{content}</Text>
        </View>
    )
}