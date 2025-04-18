import React from 'react';
import { TextStyle, StyleProp, ViewStyle } from 'react-native';
declare const NumberButton: ({ value, style, textStyle, disabled, backSpace, backSpaceText, onPress, disabledStyle }: {
    value: string;
    disabled?: boolean | undefined;
    backSpace?: JSX.Element | undefined;
    backSpaceText?: string | undefined;
    onPress: (number: string) => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabledStyle?: StyleProp<TextStyle>;
}) => React.JSX.Element;
export default NumberButton;
