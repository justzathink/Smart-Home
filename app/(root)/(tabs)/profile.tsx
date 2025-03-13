import React from "react";
import { View, Text} from "react-native";
import { Link } from "expo-router";
export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-lg my-10 font-rubik text-3xl">Welcome to the Home Page</Text>
      <Link href="/onboarding">onboarding</Link>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">explore</Link>
      <Link href="/profile">profile</Link>
      <Link href="/properties/1">Property</Link>
    </View>
  );
}