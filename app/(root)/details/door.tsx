import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { getCorrectPin } from "@/api/password";
const Door = () => {
    const [pin, setPin] = useState<string[]>(['', '', '', '', '']);
    const [correctPin, setCorrectPin] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const inputs = useRef<(TextInput | null)[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getPin = async () => {
            const fetchedPin = await getCorrectPin();
            if (fetchedPin) {
                setCorrectPin(fetchedPin);
            } else {
                setErrorMessage("Không thể lấy mật khẩu");
            }
        };

        getPin();
    }, []);

    const handlePinChange = (text: string, index: number) => {
        const newPin = [...pin];
        newPin[index] = text.slice(0, 1);
        setPin(newPin);
        if (text && index < pin.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const enteredPin = pin.join('');
        if (enteredPin === correctPin) {
            setErrorMessage('');
            Alert.alert("Success", "Mật khẩu chính xác!", [
                {
                    text: "OK",
                    onPress: () => router.push("/(root)/(tabs)"),
                },
            ]);
        } else {
            setErrorMessage('Sai mật khẩu');
            setPin(['', '', '', '', '']);
            inputs.current[0]?.focus();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 pt-40 items-center">
            <Stack.Screen options={{ headerShown: true, title: "Quản lý cửa" }} />
            <Text className="text-lg font-bold mb-5">Nhập mật khẩu</Text>

            <View className="flex-row justify-between mb-3">
                {pin.map((digit, index) => (
                    <TextInput
                        key={index}
                        className="w-12 h-12 border-2 rounded-lg mx-2 text-center text-xl"
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handlePinChange(text, index)}
                        ref={(ref) => (inputs.current[index] = ref)}
                    />
                ))}
            </View>

            {errorMessage ? <Text className="text-red-500 mb-5">{errorMessage}</Text> : null}

            <TouchableOpacity
                className="bg-indigo-500 w-4/5 p-4 rounded-xl mb-4 justify-center items-center"
                onPress={handleSubmit}
            >
                <Text className="text-white font-bold text-lg">ĐỒNG Ý</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-gray-200 w-4/5 p-4 rounded-xl justify-center items-center"
                onPress={() => router.push('/details/change_password')}
            >
                <Text className="text-indigo-500 font-bold text-lg">ĐỔI MẬT KHẨU</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Door;
