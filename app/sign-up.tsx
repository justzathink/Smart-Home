import React from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
	const router = useRouter();

	const onPress = (screen: "/sign-in" | "/(root)/(tabs)") => {
		router.push(screen);
	};
	return (
		<SafeAreaView className='flex-1 bg-white px-6 pt-60'>
			<Text className='text-4xl font-bold mb-2'>Smart home</Text>
			<Text className='text-2xl font-semibold mb-1 pt-5'>ĐĂNG KÍ</Text>
			<Text className='text-gray-500 mb-4'>
				Có vẻ như bạn chưa có tài khoản. Hãy tạo một tài khoản mới cho bạn nhé!
			</Text>

			<TextInput
				className='w-full h-12 rounded-lg px-4 bg-gray mb-3'
				placeholder='Tên'
				keyboardType='default'
			/>

			<TextInput
				className='w-full h-12 rounded-lg px-4 bg-gray mb-3'
				placeholder='Email'
				keyboardType='email-address'
			/>
			<TextInput
				className='w-full h-12 rounded-lg px-4 bg-gray mb-3'
				placeholder='Mật khẩu'
				secureTextEntry
			/>

			<TouchableOpacity className='w-full bg-purple py-3 rounded-2xl mb-4'>
				<Text
					className='text-center font-bold text-lg'
					onPress={() => onPress("/(root)/(tabs)")}
				>
					TẠO TÀI KHOẢN
				</Text>
			</TouchableOpacity>

			<View className='flex-row justify-center items-center'>
				<Text className='text-gray-500 text-lg'>TRỞ LẠI</Text>
				<TouchableOpacity onPress={() => onPress("/sign-in")}>
					<Text className='text-lg text-purple font-bold'> ĐĂNG NHẬP</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default SignUp;
