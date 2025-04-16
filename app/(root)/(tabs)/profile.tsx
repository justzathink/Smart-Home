import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
	const router = useRouter();
	const [username, setUsername] = useState<string | null>("");

	useEffect(() => {
		const fetchUserName = async () => {
			const username = await AsyncStorage.getItem('username')
			setUsername(username)
		}
		fetchUserName();
	}, [])


	const handleDetail = (screen: "/details/setting" | "/") => {
		router.push(screen);
	};

	const logout = async () => {
		await AsyncStorage.removeItem("token");
		await AsyncStorage.removeItem("username");
		router.replace("/sign-in");
	};

	return (
		<SafeAreaView className='flex-1 bg-white px-6 pt-10'>
			<Text className='font-semibold text-2xl mb-3'>Hồ sơ người dùng</Text>
			<Image
				source={images.profile}
				className='w-full h-1/4'
				resizeMode='contain'
			/>
			<Text className='text-2xl font-bold text-center'>{username}</Text>
			<Text className='text-gray-500 text-sm text-center'>
				{username}@example.com
			</Text>
			<View className='border-b border-purple my-4' />
			<TouchableOpacity
				onPress={() => handleDetail("/details/setting")}
				className='flex-row items-center bg-gray p-4 rounded-2xl my-2'
			>
				<View className='bg-white rounded-full p-2'>
					<Image
						source={icons.setting}
						resizeMode='contain'
						className='size-6'
					/>
				</View>
				<Text className='ml-4 text-lg font-medium'>Cài đặt</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={logout}
				className='flex-row items-center bg-gray p-4 rounded-2xl my-2'
			>
				<View className='bg-white rounded-full p-2'>
					<Image
						source={icons.logout}
						resizeMode='contain'
						className='size-6'
					/>
				</View>
				<Text className='ml-4 text-lg font-medium'>Đăng xuất</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};
export default Profile;
