import React from "react";
import { View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Control = () => {
    return (
        <SafeAreaView>
                            {}
                            <Stack.Screen 
                                options={{ 
                                    headerShown: true, 
                                    title: "Điều khiển"
                                }} 
                            />
                            <Text>Điều khiển</Text>
        </SafeAreaView>
    )
}

export default Control;