import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "@/constants/config";
import Constants from "expo-constants"

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Config noti
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

const LoginScreen = () => {
	const router = useRouter();

	const onPress = (screen: "/sign-up" | "/(root)/(tabs)") => {
		router.push(screen);
	};

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			if (!Device.isDevice) {
				alert("Push notifications only work on physical devices!");
				return;
			}

			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus: Notifications.PermissionStatus = existingStatus;

			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}

			const tokenData = await Notifications.getExpoPushTokenAsync({
				'projectId': Constants?.expoConfig?.extra?.eas?.projectId,
			});
			const expoPushToken: string = tokenData.data;

			const respond = await axios.post(`${config.BASE_URL}/auth/login`, {
				username,
				password,
				expoPushToken
			});

			const token = respond.data.token;
			await AsyncStorage.setItem("token", token);
			await AsyncStorage.setItem("username", username);
			router.replace("/(root)/(tabs)");
		} catch (error) {
			console.error(error);
			Alert.alert("Login fail!!!");
		}
	};

	return (
		<SafeAreaView className='flex-1 bg-white px-6 pt-60'>
			<Text className='text-4xl font-bold mb-2'>Smart home</Text>
			<Text className='text-2xl font-semibold mb-1 pt-5'>ĐĂNG NHẬP</Text>
			<Text className='text-gray-500 mb-4'>
				Chào mừng quay trở lại! Hãy đăng nhập để tiếp tục.
			</Text>

			<TextInput
				className='w-full h-12 rounded-lg px-4 bg-gray mb-3'
				placeholder='Tên Đăng Nhập'
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				className='w-full h-12 rounded-lg px-4 bg-gray mb-3'
				placeholder='Mật khẩu'
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>

			<TouchableOpacity>
				<Text className='text-gray self-end mb-4'>Quên mật khẩu?</Text>
			</TouchableOpacity>

			<TouchableOpacity className='w-full bg-purple py-3 rounded-2xl mb-4'>
				<Text className='text-center font-bold text-lg' onPress={handleLogin}>
					ĐĂNG NHẬP
				</Text>
			</TouchableOpacity>

			<View className='flex-row justify-center items-center'>
				<Text className='text-gray-500 text-lg'>BẠN KHÔNG CÓ TÀI KHOẢN? </Text>
				<TouchableOpacity>
					<Text
						className='text-lg text-purple font-bold'
						onPress={() => onPress("/sign-up")}
					>
						ĐĂNG KÍ
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;