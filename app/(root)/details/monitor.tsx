import React from "react";
import { useRouter } from "expo-router";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Card } from "react-native-paper";

import icons from '@/constants/icons'

type SensorCardProps = {
    icon: any;
    value: string;
    label: string;
};

const SensorCard: React.FC<SensorCardProps> = ({ icon, value, label }) => (
    <View className="flex-1 p-4 bg-slate-200 rounded-lg items-center m-2">
        <View className="bg-white rounded-full p-2">
            <Image source={icon} resizeMode="contain" className="size-6" />
        </View>
        <Text className="text-xl font-bold mt-2">{value}</Text>
        <Text className="text-neutral-700 font-normal text-md mt-1 pb-3">{label}</Text>
    </View>
);

const Monitor = () => {

    const router = useRouter();
    const handleSensorDetail = (screen: "/details/sensor") => {
        router.push(screen);
    };

    return (
        <SafeAreaView className="px-6 bg-white h-full">
            { }
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Giám sát môi trường"
                }}
            />
            <Text className="font-semibold text-2xl mb-3">Thông tin chung</Text>

            <View className="flex flex-row">
                <SensorCard icon={icons.humid} value="6%" label="Độ ẩm" />
                <SensorCard icon={icons.light} value="332 lux" label="Cường độ ánh sáng" />
            </View>

            <View className="flex flex-row">
                <SensorCard icon={icons.tempin} value="25°C" label="Nhiệt độ bên trong" />
                <SensorCard icon={icons.tempout} value="32°C" label="Nhiệt độ bên ngoài" />
            </View>
            <TouchableOpacity onPress={() => handleSensorDetail("/details/sensor")} className="items-center p-4 w-[50vw] mx-auto my-5 bg-blue-400 rounded-2xl">
                <Text className="text-lg w-full text-center text-white font-medium">Thông tin cảm biến</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Monitor;
