import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import icons from '@/constants/icons'
// import { Link } from "expo-router";

const features = [
  { id: "1", name: "Giám sát môi trường", icon: "sunny-outline" },
  { id: "2", name: "Thống kê số liệu", icon: "bar-chart-outline" },
  { id: "3", name: "Điều khiển", icon: "toggle-outline" },
  { id: "4", name: "Quản lý cửa", icon: "lock-closed-outline" }
];

const FeatureItem = ({ item }) => (
  <TouchableOpacity className="flex-row items-center bg-gray-100 p-4 rounded-lg my-2">
      <Ionicons name={item.icon} size={24} color="black" className="mr-4" />
      <Text className="text-lg font-medium">{item.name}</Text>
  </TouchableOpacity>
);

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text className="font-bold text-lg my-10 font-rubik text-3xl">Welcome to the Home Page</Text>
//       <Link href="/onboarding">onboarding</Link>
//       <Link href="/sign-in">Sign In</Link>
//       <Link href="/explore">explore</Link>
//       <Link href="/profile">profile</Link>
//       <Link href="/properties/1">Property</Link>
//     </View>
//   );
// }

const Index = () => {
  return (
      <SafeAreaView className="flex-1 bg-white px-6 pt-40">
          <StatusBar style="dark" />
          <Text className="text-2xl font-bold">Xin chào, User</Text>
          <Text className="text-gray-500 text-sm">DĨ AN, BÌNH DƯƠNG</Text>
          <Text className="text-gray-400 text-xs mt-1">26/02/2025</Text>
          <View className="border-b border-gray-200 my-4" />
          <Text className="text-lg font-semibold mb-2">Chức năng</Text>
          <FlatList 
              data={features} 
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <FeatureItem item={item} />} 
          />
      </SafeAreaView>
  );
};

export default Index;

