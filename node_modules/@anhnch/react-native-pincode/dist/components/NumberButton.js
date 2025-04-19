import React from 'react';
import { Text, Pressable } from 'react-native';
import { DEFAULT } from '../common';
const NumberButton = ({ value, style, textStyle, disabled = false, backSpace, backSpaceText, onPress, disabledStyle }) => {
    var _a, _b, _c, _d;
    if (value == 'delete') {
        return <Pressable disabled={disabled} onPress={() => onPress(value)} style={({ pressed }) => {
                var _a;
                return [
                    (_a = DEFAULT.Styles.enter) === null || _a === void 0 ? void 0 : _a.button,
                    style,
                    { backgroundColor: 'transparent', opacity: pressed ? 0.5 : 1 },
                ];
            }}>
            {backSpace || <Text style={[(_a = DEFAULT.Styles.enter) === null || _a === void 0 ? void 0 : _a.buttonText, textStyle]}>
                {backSpaceText || ((_b = DEFAULT.TextOptions.enter) === null || _b === void 0 ? void 0 : _b.backSpace)}
            </Text>}
        </Pressable>;
    }
    return <Pressable disabled={disabled} onPress={() => onPress(value)} style={({ pressed }) => {
            var _a;
            return [
                (_a = DEFAULT.Styles.enter) === null || _a === void 0 ? void 0 : _a.button,
                { backgroundColor: disabled ? 'rgba(255,255,255,0.5)' : '#FFF', opacity: pressed ? 0.5 : 1 },
                style
            ];
        }}>
        <Text style={[(_c = DEFAULT.Styles.enter) === null || _c === void 0 ? void 0 : _c.buttonText, textStyle, disabled ? (_d = DEFAULT.Styles.enter) === null || _d === void 0 ? void 0 : _d.buttonTextDisabled : {}, disabled ? disabledStyle : {}]}>{value}</Text>
    </Pressable>;
};
export default NumberButton;
//# sourceMappingURL=NumberButton.js.map