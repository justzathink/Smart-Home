import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';
declare const Countdown: ({ duration, style, textStyle, onFinish }: {
    duration?: number | undefined;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    onFinish: () => void;
}) => React.JSX.Element;
export default Countdown;
