import React from "react";
import { View } from "react-native";
import { DEFAULT } from "../common";
import NumberButton from "./NumberButton";
const NumbersPanel = ({ style, buttonStyle, onButtonPress, textStyle, rowStyle, disabled, backSpaceText, backSpace }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return <View style={[(_a = DEFAULT.Styles.enter) === null || _a === void 0 ? void 0 : _a.buttonContainer, style]}>
        <View style={[(_b = DEFAULT.Styles.enter) === null || _b === void 0 ? void 0 : _b.buttonRow, rowStyle]}>
            <NumberButton value={'1'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
            <NumberButton value={'2'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
            <NumberButton value={'3'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
        </View>
        <View style={[(_c = DEFAULT.Styles.enter) === null || _c === void 0 ? void 0 : _c.buttonRow, rowStyle]}>
            <NumberButton value={'4'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
            <NumberButton value={'5'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
            <NumberButton value={'6'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
        </View>
        <View style={[(_d = DEFAULT.Styles.enter) === null || _d === void 0 ? void 0 : _d.buttonRow, rowStyle]}>
            <NumberButton value={'7'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
            <NumberButton value={'8'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
            <NumberButton value={'9'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
        </View>
        <View style={[(_e = DEFAULT.Styles.enter) === null || _e === void 0 ? void 0 : _e.buttonRow, rowStyle]}>
            <View style={[(_f = DEFAULT.Styles.enter) === null || _f === void 0 ? void 0 : _f.button, buttonStyle, { backgroundColor: 'transparent', borderWidth: 0 }]}/>
            <NumberButton value={'0'} disabled={disabled} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
            <NumberButton value={'delete'} disabled={disabled} backSpace={backSpace} backSpaceText={backSpaceText || ((_g = DEFAULT.TextOptions.set) === null || _g === void 0 ? void 0 : _g.backSpace)} style={buttonStyle} textStyle={textStyle} onPress={onButtonPress}/>
        </View>
    </View>;
};
export default NumbersPanel;
//# sourceMappingURL=NumbersPanel.js.map