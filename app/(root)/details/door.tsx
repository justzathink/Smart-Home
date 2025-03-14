import React from "react";
import { View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Door = () => {
    return (
        <SafeAreaView>
                    {}
                    <Stack.Screen 
                        options={{ 
                            headerShown: true, 
                            title: "Quản lý cửa"
                        }} 
                    />
                    <Text>Quản lý cửa</Text>
        </SafeAreaView>
    )
}

export default Door;