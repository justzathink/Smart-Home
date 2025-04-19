import { View, Text, Image} from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import icons from '@/constants/icons'

const TabIcon = ({
    focused,
    icon,
    title,
  }: {
    focused: boolean;
    icon: any;
    title: string;
  }) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "white" : "#666876"}
        resizeMode="contain"
        className="size-6"
      />
      <Text
        className={`${
          focused
            ? "text-white font-rubik-medium"
            : "text-black-200 font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );

const Tabslayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "black",
                    position: "absolute",
                    borderTopColor: "white",
                    borderTopWidth: 1,
                    minHeight: 70,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Nhà",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.grid} focused = {focused} title="Nhà"/>
                    )
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: "Notification",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.notification} focused = {focused} title="Thông báo"/>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Hồ sơ",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.person} focused = {focused} title="Hồ sơ"/>
                    )
                }}
            />
        </Tabs>
    );
};

export default Tabslayout;