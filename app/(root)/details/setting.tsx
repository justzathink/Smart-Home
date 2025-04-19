import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Stack

} from "expo-router";
const Setting = () => {
    return (
        <SafeAreaView>
            { }
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Cài đặt"
                }}
            />
            <Text>Cài đặt</Text>

        </SafeAreaView>
    )
}

export default Setting;