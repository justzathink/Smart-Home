import React from "react";
import { View } from "react-native";
import { DEFAULT } from "../common";
const Pin = ({ pin, pinLength, style, pinStyle, enteredPinStyle }) => {
    var _a;
    const items = [];
    for (let i = 1; i <= pinLength; i++) {
        items.push(<View key={'pin_' + i} style={[
                pinStyle,
                pin.length >= i ? enteredPinStyle : {}
            ]}/>);
    }
    return <View style={[(_a = DEFAULT.Styles.enter) === null || _a === void 0 ? void 0 : _a.pinContainer, style]}>
        {items}
    </View>;
};
export default Pin;
//# sourceMappingURL=Pin.js.map