import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Switch,
	FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import icons from "@/constants/icons";
import { fetchLEDStatus, updateLEDStatus } from "@/api/light_control";

type Device = {
	id: string;
	label: string;
	icon: any;
};

type DeviceControlProps = {
	icon: any;
	label: string;
	isEnabled: boolean;
	toggleSwitch: (value: boolean) => void;
};

const DeviceControl: React.FC<DeviceControlProps> = ({
	icon,
	label,
	isEnabled,
	toggleSwitch,
}) => {
	return (
		<TouchableOpacity className='flex-row items-center bg-gray p-6 rounded-2xl my-2 justify-between'>
			<View className='flex-col'>
				<View className='bg-white rounded-full w-10 h-10 justify-center items-center'>
					<Image source={icon} resizeMode='contain' className='size-6' />
				</View>
				<Text className='mt-4 text-lg font-medium'>{label}</Text>
			</View>
			<Switch
				value={isEnabled}
				onValueChange={toggleSwitch}
				trackColor={{ false: "#767577", true: "#6C63FF" }}
				thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
				ios_backgroundColor='#3e3e3e'
			/>
		</TouchableOpacity>
	);
};

const LightControl: React.FC = () => {
	const [devices, setDevices] = useState<Device[]>([
		{ id: "1", label: "Đèn 1", icon: icons.lightbulb },
	]);

	let status : boolean;


	const [deviceStates, setDeviceStates] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		const getInitialLEDStatus = async () => {
			const status = await fetchLEDStatus();
			setDeviceStates({ "1": status });
		};
		getInitialLEDStatus();
	}, []);

	

	const toggleSwitch = async (deviceId: string) => {
		const status = deviceStates[deviceId];
		setDeviceStates({ [deviceId]: !status });
		console.log(!status);
		await updateLEDStatus(!status);
	};
    console.log(deviceStates);

	return (
		<SafeAreaView className='px-6 bg-white h-full'>
			<Stack.Screen options={{ headerShown: true, title: "Điều khiển" }} />
			<Text className='font-semibold text-2xl mb-3'>Danh sách Đèn</Text>
			<FlatList
				data={devices}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<DeviceControl
						icon={item.icon}
						label={item.label}
						isEnabled={deviceStates[item.id] || false}
						toggleSwitch={() => toggleSwitch(item.id)}
					/>
				)}
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default LightControl;
