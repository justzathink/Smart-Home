import React, { useState, useRef } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { getCorrectPin, updateCorrectPin } from "@/api/password";
import images from '@/constants/images'
const Password = () => {
    const [pin, setPin] = useState<string[]>(['', '', '', '', '']);
    const [newPin, setNewPin] = useState<string[]>(['', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const currentPinInputs = useRef<(TextInput | null)[]>([]);
    const newPinInputs = useRef<(TextInput | null)[]>([]);
    const router = useRouter();

    const handlePinChange = (text: string, index: number) => {
        const newPinState = [...pin];
        newPinState[index] = text.slice(0, 1);
        setPin(newPinState);
        if (text && index < pin.length - 1) {
            currentPinInputs.current[index + 1]?.focus();
        }
    };

    const handleNewPinChange = (text: string, index: number) => {
        const newPinState = [...newPin];
        newPinState[index] = text.slice(0, 1);
        setNewPin(newPinState);
        if (text && index < newPin.length - 1) {
            newPinInputs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const enteredPin = pin.join('');
        const updatedPin = newPin.join('');

        const correctPin = await getCorrectPin();

        if (correctPin && enteredPin === correctPin) {
            const success = await updateCorrectPin(updatedPin);

            if (success) {
                setErrorMessage('');
                Alert.alert("Thành công", "Đã đổi mật khẩu!", [
                    {
                        text: "OK",
                        onPress: () => router.push("/(root)/(tabs)"),
                    },
                ]);
            } else {
                setErrorMessage("Lỗi khi cập nhật mật khẩu");
            }
        } else {
            setErrorMessage('Sai mật khẩu hiện tại, hãy nhập lại');
            setPin(['', '', '', '', '']);
            setNewPin(['', '', '', '', '']);
            currentPinInputs.current[0]?.focus();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 pt-30 items-center">
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Quản lý cửa"
                }}
            />
            <Image source={images.forgotpassword} className="w-full h-1/3" resizeMode="contain"/>
            <Text className="text-lg font-bold mb-5">Nhập mật khẩu hiện tại</Text>
            <View className="flex-row justify-between mb-3">
                {pin.map((digit, index) => (
                    <TextInput
                        key={index}
                        className="w-12 h-12 border-2 rounded-lg mx-2 text-center text-xl"
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handlePinChange(text, index)}
                        ref={(ref) => (currentPinInputs.current[index] = ref)}
                    />
                ))}
            </View>
            {errorMessage ? <Text className="text-red-500 mb-5">{errorMessage}</Text> : null}

            <Text className="text-lg font-bold mb-5">Nhập mật khẩu mới</Text>
            <View className="flex-row justify-between mb-3">
                {newPin.map((digit, index) => (
                    <TextInput
                        key={index}
                        className="w-12 h-12 border-2 rounded-lg mx-2 text-center text-xl"
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleNewPinChange(text, index)}
                        ref={(ref) => (newPinInputs.current[index] = ref)}
                    />
                ))}
            </View>

            <TouchableOpacity className="bg-indigo-500 w-4/5 p-4 rounded-xl mb-4 justify-center items-center" onPress={handleSubmit}>
                <Text className="text-white font-bold text-lg">XÁC NHẬN</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Password;
