import React from "react";
import { View, Text, ScrollView, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import images from '@/constants/images'
const SignIn = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full">
                <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain"/>
                <View className="px-10">
                    <Text className="text-base text-center font-rubik text-black-200">Smart home</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn;