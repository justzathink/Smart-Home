import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Stack

} from "expo-router";
const Statistic = () => {
    return (
        <SafeAreaView>
            { }
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Thống kê dữ liệu"
                }}
            />
            <Text>Thống kê dữ liệu</Text>

        </SafeAreaView>
    )
}

export default Statistic;