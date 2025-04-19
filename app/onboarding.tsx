import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import images from '@/constants/images'
const OnBoarding = () => {
    const router = useRouter();
    const handleLogin = () => {
        router.push("/sign-in");
    };
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full">
                <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain"/>
                <View className="px-10 mt-[-80]">
                    <Text className="text-6xl font-rubik-bold text-center text-black">Smart home</Text>
                    <Text className="text-base text-center font-rubik text-black">Sống tiện nghi - Kết nối tương lai</Text>
                    <TouchableOpacity onPress={handleLogin} className="mt-5 bg-purple px-4 py-4 rounded-2xl self-center">
                        <View className="flex flex-row items-center justify-center">
                            <Text className="text-black text-xl font-rubik-light">Bắt đầu</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OnBoarding;