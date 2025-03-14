import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Modal from "react-native-modal";

import { GestureHandlerRootView } from "react-native-gesture-handler";

type SensorInfoProps = {
    name: string;
    number: string;
    onPress: () => void;
};

const SensorCard: React.FC<SensorInfoProps> = ({ name, number, onPress }) => (
    <TouchableOpacity
        className="flex flex-col p-4 my-2 bg-slate-200 rounded-lg shadow-md items-start"
        onPress={onPress}
    >
        <Text className="text-xl font-semibold">{name}</Text>
        <Text className="text-neutral-700 font-normal text-md mt-1">{number} thiết bị</Text>
    </TouchableOpacity>
);

const Monitor = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

    const openSheet = (sensorName: string) => {
        setSelectedSensor(sensorName);
        setModalVisible(true);
    };

    const closeSheet = () => {
        setSelectedSensor(null);
    };

    const sensorDetails: Record<string, { id: string; name: string; type: string; status: string }[]> = {
        "Cảm biến ánh sáng": [
            { id: "1", name: "Cảm biến ánh sáng 1", type: "DT", status: "Bình thường" },
        ],
        "Cảm biến nhiệt độ": [
            { id: "1", name: "Cảm biến nhiệt độ 1", type: "DT", status: "Bình thường" },
            { id: "2", name: "Cảm biến nhiệt độ 2", type: "DT", status: "Bình thường" },
        ],
        "Cảm biến độ ẩm": [
            { id: "3", name: "Cảm biến độ ẩm 1", type: "DT", status: "Bình thường" },
            { id: "4", name: "Cảm biến độ ẩm 2", type: "DT", status: "Bình thường" },
        ],
    };

    const sensorList = useMemo(() => {
        return selectedSensor ? sensorDetails[selectedSensor] : [];
    }, [selectedSensor]);

    return (
        <SafeAreaView className="px-6 bg-white h-full">
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Giám sát môi trường",
                }}
            />
            <Text className="font-semibold text-2xl mb-3">Thông tin cảm biến</Text>
            <SensorCard name="Cảm biến ánh sáng" number="1" onPress={() => openSheet("Cảm biến ánh sáng")} />
            <SensorCard name="Cảm biến nhiệt độ" number="2" onPress={() => openSheet("Cảm biến nhiệt độ")} />
            <SensorCard name="Cảm biến độ ẩm" number="2" onPress={() => openSheet("Cảm biến độ ẩm")} />

            {/* Bottom Sheet */}
            {isModalVisible && selectedSensor && (
                <Modal
                    isVisible={isModalVisible}
                    onSwipeComplete={() => setModalVisible(false)}
                    onBackdropPress={() => setModalVisible(false)}
                    swipeDirection="down"
                    style={{ justifyContent: "flex-end", margin: 0 }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                >
                    <View style={{ backgroundColor: "white", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        {/* Drag Indicator */}
                        <View style={{ width: 50, height: 5, backgroundColor: "#ccc", borderRadius: 10, alignSelf: "center", marginBottom: 10 }} />

                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>{selectedSensor}</Text>

                        <FlatList
                            data={sensorList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: "#F3F4F6", padding: 15, borderRadius: 10, marginVertical: 5 }}>
                                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                                    <Text>Loại: {item.type}</Text>
                                    <Text>Trạng thái: {item.status}</Text>
                                </View>
                            )}
                        />
                    </View>
                </Modal>
            )}

        </SafeAreaView>
    );
};

export default Monitor;
