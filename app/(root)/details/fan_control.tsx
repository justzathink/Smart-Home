import React, {useState}  from "react";
import { View, Text, TouchableOpacity, Image, Switch, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import icons from '@/constants/icons'
import Modal from "react-native-modal";

type DeviceControlProps = {
    icon: any;
    label: string;
    isEnabled: boolean;
    toggleSwitch: (value: boolean) => void;
    onPress: () => void;
};

const DeviceControl: React.FC<DeviceControlProps> = ({ icon, label, isEnabled, toggleSwitch, onPress }) => {
    return (
        <TouchableOpacity className="flex-row items-center bg-gray p-6 rounded-2xl my-2 justify-between" onPress={onPress}>
            <View className="flex-col">
                <View className="bg-white rounded-full w-10 h-10 justify-center items-center">
                    <Image source={icon} resizeMode="contain" className="size-6" />
                </View>
                <Text className="mt-4 text-lg font-medium">{label}</Text>
            </View>
            <Switch
                value={isEnabled}
                onValueChange={toggleSwitch}
                trackColor={{ false: "#767577", true: "#6C63FF" }}
                thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
            />
        </TouchableOpacity>
    );
};


const Control = () =>{
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDevice, setselectedDevice] = useState<string | null>(null);

    // List of devices
    const [devices, setDevices] = useState([
        { id: "1", label: "Đèn 1", icon: icons.fan },
        { id: "2", label: "Đèn 2", icon: icons.fan },
        { id: "3", label: "Đèn 3", icon: icons.fan },
        { id: "4", label: "Đèn 4", icon: icons.fan },
        { id: "5", label: "Đèn 5", icon: icons.fan },
        { id: "6", label: "Đèn 6", icon: icons.fan }
    ]);
    // Store individual switch states
    const [deviceStates, setDeviceStates] = useState<{ [key: string]: boolean }>(
        Object.fromEntries(devices.map(device => [device.id, false]))
    );

    const openSheet = (deviceName: string) => {
        setselectedDevice(deviceName);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setselectedDevice(null);
    };

    const toggleSwitch = (deviceId: string, newValue: boolean) => {
        setDeviceStates(prev => ({
            ...prev,
            [deviceId]: newValue
        }));
    };
    return (
        <SafeAreaView className="px-6 bg-white h-full">
            {}
            <Stack.Screen
                options={{ 
                        headerShown: true, 
                        title: "Điều khiển"
                    }}
            />
            <Text className="font-semibold text-2xl mb-3">Danh sách quạt</Text>
            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeviceControl
                        icon={item.icon}
                        label={item.label}
                        isEnabled={deviceStates[item.id]}
                        toggleSwitch={(value) => toggleSwitch(item.id, value)}
                        onPress={() => openSheet(item.label)}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 20 }} // Extra space at bottom
                showsVerticalScrollIndicator={false} // Hide scrollbar
            />
            {/* Modal for device settings */}
            <Modal 
                isVisible={isModalVisible} 
                onSwipeComplete={closeModal}
                onBackdropPress={closeModal} 
                swipeDirection="down"
                style={{ justifyContent: "flex-end", margin: 0 }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={400}
                >
                <View className="bg-white rounded-t-2xl p-6">
                    <View className="h-1 w-10 bg-gray-300 self-center rounded-full mb-4" />
                    <Text className="text-lg font-semibold text-center mb-4">
                        Đặt lịch cho {selectedDevice}
                    </Text>
                    <View className="bg-gray-100 p-4 rounded-xl mb-4">
                        <Text className="text-base text-gray-600">Thời gian</Text>
                        <Text className="text-lg font-semibold">Bắt đầu: 8:00</Text>
                        <Text className="text-lg font-semibold">Kết thúc: 23:00</Text>
                    </View>
                    <TouchableOpacity
                        className="bg-blue-500 py-3 rounded-xl items-center mb-2"
                        onPress={closeModal}
                    >
                        <Text className="text-white text-lg font-semibold">ĐỒNG Ý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="border border-purple-700 py-3 rounded-xl items-center"
                        onPress={closeModal}
                    >
                        <Text className="text-purple-700 text-lg font-semibold">QUAY LẠI</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>

    )
}

export default Control;