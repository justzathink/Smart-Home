import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import icons from '@/constants/icons';
import { fetchFanSpeed, updateFanSpeed } from "@/api/fan_control";
import Slider from '@react-native-community/slider';

// Định nghĩa kiểu dữ liệu
interface Device {
    id: string;
    label: string;
    icon: any;
}

interface DeviceControlProps {
    icon: any;
    label: string;
    sliderValue: number;
    onSliderChange: (value: number) => void;
}

const DeviceControl: React.FC<DeviceControlProps> = ({ icon, label, sliderValue, onSliderChange }) => {
    return (
        <TouchableOpacity className="flex-row items-center bg-gray p-6 rounded-2xl my-2 justify-between">
            <View className="flex-col">
                <View className="bg-white rounded-full w-10 h-10 justify-center items-center">
                    <Image source={icon} resizeMode="contain" className="size-6" />
                </View>
                <Text className="mt-4 text-lg font-medium">{label}</Text>
            </View>
            <Slider
                style={{ width:250, height: 50 }}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                value={sliderValue}
                onValueChange={onSliderChange}
                minimumTrackTintColor="#6C63FF"
                maximumTrackTintColor="#767577"
                thumbTintColor="#6C63FF"
            />
        </TouchableOpacity>
    );
};

const FanControl: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([{ id: "1", label: "Quạt 1", icon: icons.fan }]);
    const [sliderValues, setSliderValues] = useState<Record<string, number>>({ "1": 0 });

    // useRef để lưu timeout của debounce
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const getInitialSliderValue = async () => {
            const value = await fetchFanSpeed();
            setSliderValues({ "1": value });
        };
        getInitialSliderValue();
    }, []);

    const handleSliderChange = (deviceId: string, value: number) => {
        setSliderValues(prev => ({ ...prev, [deviceId]: value }));

        // Xóa timeout cũ nếu người dùng tiếp tục kéo slider
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Đặt timeout mới để cập nhật API sau 500ms nếu không có thay đổi tiếp
        debounceTimeout.current = setTimeout(async () => {
            await updateFanSpeed(value);
        }, 500);
    };

    console.log(sliderValues);

    return (
        <SafeAreaView className="px-6 bg-white h-full">
            <Stack.Screen options={{ headerShown: true, title: "Điều khiển" }} />
            <Text className="font-semibold text-2xl mb-3">Danh sách Quạt</Text>
            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeviceControl
                        icon={item.icon}
                        label={item.label}
                        sliderValue={sliderValues[item.id] || 0}
                        onSliderChange={(value) => handleSliderChange(item.id, value)}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default FanControl;
