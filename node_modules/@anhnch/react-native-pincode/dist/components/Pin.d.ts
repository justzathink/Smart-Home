import React from "react";
import { StyleProp, ViewStyle } from "react-native";
declare const Pin: ({ pin, pinLength, style, pinStyle, enteredPinStyle }: {
    pin: string;
    pinLength: number;
    style?: StyleProp<ViewStyle>;
    pinStyle?: StyleProp<ViewStyle>;
    enteredPinStyle?: StyleProp<ViewStyle>;
}) => React.JSX.Element;
export default Pin;
