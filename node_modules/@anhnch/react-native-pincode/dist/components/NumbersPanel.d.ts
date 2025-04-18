import React from "react";
import { StyleProp, TextStyle, ViewProps } from "react-native";
declare const NumbersPanel: ({ style, buttonStyle, onButtonPress, textStyle, rowStyle, disabled, backSpaceText, backSpace }: {
    buttonStyle?: StyleProp<ViewProps>;
    onButtonPress: (value: string) => void;
    style?: StyleProp<ViewProps>;
    textStyle?: StyleProp<TextStyle>;
    rowStyle?: StyleProp<TextStyle>;
    disabledStyle?: StyleProp<TextStyle>;
    backSpace?: JSX.Element | undefined;
    backSpaceText?: string | undefined;
    disabled?: boolean | undefined;
}) => React.JSX.Element;
export default NumbersPanel;
