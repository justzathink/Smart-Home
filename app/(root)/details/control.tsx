import React from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import icons from '@/constants/icons'
import { useRouter } from "expo-router";



const Control = () =>{
    const router = useRouter();
    
        const handleDetail = (screen: "/details/light_control" | "/details/fan_control") => {
        router.push(screen);
    };


    return (
        <SafeAreaView className="px-6 bg-white h-full">
            {}
            <Stack.Screen
                options={{ 
                        headerShown: true, 
                        title: "Điều khiển"
                    }}
            />
            <Text className="font-semibold text-2xl mb-3">Danh sách thiết bị</Text>
            <TouchableOpacity onPress={() => handleDetail("/details/light_control")} className="flex-row items-center bg-gray p-4 rounded-2xl my-2">
                <View className="bg-white rounded-full p-2">
                    <Image source={icons.lightbulb} resizeMode="contain" className="size-6"/>
                </View>
                <Text className="ml-4 text-lg font-medium">Đèn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDetail("/details/fan_control")} className="flex-row items-center bg-gray p-4 rounded-2xl my-2">
                <View className="bg-white rounded-full p-2">
                    <Image source={icons.fan} resizeMode="contain" className="size-6"/>
                </View>
                <Text className="ml-4 text-lg font-medium">Quạt</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default Control;