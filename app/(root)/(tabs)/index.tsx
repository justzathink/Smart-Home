import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import icons from "@/constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRouter } from "expo-router";

const Index = () => {
	const router = useRouter();

	const [currentTime, setCurrentTime] = useState('');

	const handleDetail = (
		screen:
			| "/details/monitor"
			| "/details/statistics"
			| "/details/control"
			| "/details/door"
			| "/details/schedule"
	) => {
		router.push(screen);
	};

	const [username, setUsername] = useState<string | null>("");

	useEffect(() => {
		const fetchUsername = async () => {
			const storedUsername = await AsyncStorage.getItem("username");
			setUsername(storedUsername);
		};
		fetchUsername();
	}, []);

	useEffect(() => {
		const now = new Date();
		const formatted = now.toLocaleDateString('vi-VN'); // định dạng dd/mm/yyyy
		setCurrentTime(formatted);
	}, []);

	return (
		<SafeAreaView className='flex-1 bg-white px-6 pt-40'>
			<StatusBar style='dark' />
			<Text className='text-2xl font-bold'>Xin chào, {username}</Text>
			<Text className='text-gray-500 text-md'>DĨ AN, BÌNH DƯƠNG</Text>
			<Text className='text-gray-400 text-md mt-1'>{currentTime}</Text>
			<View className='border-b border-purple my-4' />
			<Text className='text-lg font-semibold mb-2'>Chức năng</Text>
			<TouchableOpacity
				onPress={() => handleDetail("/details/monitor")}
				className='flex-row items-center bg-gray p-4 rounded-2xl my-2'
			>
				<View className='bg-white rounded-full p-2'>
					<Image source={icons.sun} resizeMode='contain' className='size-6' />
				</View>
				<Text className='ml-4 text-lg font-medium'>Giám sát môi trường</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => handleDetail("/details/statistics")}
				className='flex-row items-center bg-gray p-4 rounded-2xl my-2'
			>
				<View className='bg-white rounded-full p-2'>
					<Image source={icons.data} resizeMode='contain' className='size-6' />
				</View>
				<Text className='ml-4 text-lg font-medium'>Thống kê dữ liệu</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => handleDetail("/details/control")}
				className='flex-row items-center bg-gray p-4 rounded-2xl my-2'
			>
				<View className='bg-white rounded-full p-2'>
					<Image source={icons.sun} resizeMode='contain' className='size-6' />
				</View>
				<Text className='ml-4 text-lg font-medium'>Điều Khiển</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => handleDetail("/details/door")}
				className='flex-row items-center bg-gray p-4 rounded-2xl my-2'
			>
				<View className='bg-white rounded-full p-2'>
					<Image source={icons.key} resizeMode='contain' className='size-6' />
				</View>
				<Text className='ml-4 text-lg font-medium'>Quản lý cửa</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => handleDetail("/details/schedule")}
				className='flex-row items-center bg-gray p-4 rounded-2xl my-2'
			>
				<View className='bg-white rounded-full p-2'>
					<Image source={icons.key} resizeMode='contain' className='size-6' />
				</View>
				<Text className='ml-4 text-lg font-medium'>Đặt lịch</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Index;