import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { PinCodeT } from "./types";
import { DEFAULT } from "./common";
const ResetLayout = ({ styles, textOptions, options, onReset, onCancel }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const [status, setStatus] = useState(PinCodeT.Statuses.Initial);
    return <>
        <View style={[(_a = DEFAULT.Styles.reset) === null || _a === void 0 ? void 0 : _a.header, styles === null || styles === void 0 ? void 0 : styles.header]}>
            <Text style={[(_b = DEFAULT.Styles.reset) === null || _b === void 0 ? void 0 : _b.title, styles === null || styles === void 0 ? void 0 : styles.title]}>{textOptions === null || textOptions === void 0 ? void 0 : textOptions.title}</Text>
            <Text style={[(_c = DEFAULT.Styles.reset) === null || _c === void 0 ? void 0 : _c.subTitle, styles === null || styles === void 0 ? void 0 : styles.subTitle]}>{textOptions === null || textOptions === void 0 ? void 0 : textOptions.subTitle}</Text>
        </View>
        <View style={(_d = DEFAULT.Styles.reset) === null || _d === void 0 ? void 0 : _d.content}>
            {status == PinCodeT.Statuses.Initial && <>
                <Pressable onPress={() => {
                setStatus(PinCodeT.Statuses.ResetPrompted);
            }} style={state => ({ opacity: state.pressed ? 0.6 : 1 })}>
                    <Text style={[(_e = DEFAULT.Styles.reset) === null || _e === void 0 ? void 0 : _e.resetButton, styles === null || styles === void 0 ? void 0 : styles.resetButton]}>{textOptions === null || textOptions === void 0 ? void 0 : textOptions.resetButton}</Text>
                </Pressable>
            </>}
            {status == PinCodeT.Statuses.ResetPrompted && <>
                <Text style={[(_f = DEFAULT.Styles.reset) === null || _f === void 0 ? void 0 : _f.confirmText]}>{textOptions === null || textOptions === void 0 ? void 0 : textOptions.confirm}</Text>
                <Pressable onPress={onReset} style={state => ({ opacity: state.pressed ? 0.6 : 1 })}>
                    <Text style={[(_g = DEFAULT.Styles.reset) === null || _g === void 0 ? void 0 : _g.resetButton, styles === null || styles === void 0 ? void 0 : styles.resetButton]}>{textOptions === null || textOptions === void 0 ? void 0 : textOptions.confirmButton}</Text>
                </Pressable>
            </>}
        </View>
        <View style={styles === null || styles === void 0 ? void 0 : styles.footer}>
            <Text onPress={onCancel} style={[(_h = DEFAULT.Styles.reset) === null || _h === void 0 ? void 0 : _h.footerText, styles === null || styles === void 0 ? void 0 : styles.footerText]}>{textOptions === null || textOptions === void 0 ? void 0 : textOptions.footerText}</Text>
        </View>
    </>;
};
export default ResetLayout;
//# sourceMappingURL=ResetLayout.js.map