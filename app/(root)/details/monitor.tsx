import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Monitor = () => {
    return (
        <SafeAreaView>
            {}
            <Stack.Screen 
                options={{ 
                    headerShown: true, 
                    title: "Giám sát môi trường"
                }} 
            />
            <Text>Monitor</Text>
        </SafeAreaView>
    );
};

export default Monitor;
