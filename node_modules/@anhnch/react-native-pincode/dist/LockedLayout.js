import React from 'react';
import { Text, View } from "react-native";
import { DEFAULT, millisToMinutesAndSeconds } from './common';
import Countdown from './components/Countdown';
const LockedLayout = ({ styles, options, textOptions, onClockFinish }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return <>
        <View style={[(_a = DEFAULT.Styles.locked) === null || _a === void 0 ? void 0 : _a.header, styles === null || styles === void 0 ? void 0 : styles.header]}>
            <Text style={[(_b = DEFAULT.Styles.locked) === null || _b === void 0 ? void 0 : _b.title, styles === null || styles === void 0 ? void 0 : styles.title]}>{textOptions === null || textOptions === void 0 ? void 0 : textOptions.title}</Text>
            <Text style={[(_c = DEFAULT.Styles.locked) === null || _c === void 0 ? void 0 : _c.subTitle, styles === null || styles === void 0 ? void 0 : styles.subTitle]}>
                {(_d = textOptions === null || textOptions === void 0 ? void 0 : textOptions.subTitle) === null || _d === void 0 ? void 0 : _d.replace('{{maxAttempt}}', ((options === null || options === void 0 ? void 0 : options.maxAttempt) || DEFAULT.Options.maxAttempt || 5).toString()).replace('{{lockDuration}}', millisToMinutesAndSeconds((options === null || options === void 0 ? void 0 : options.lockDuration) || DEFAULT.Options.lockDuration || 60000))}
            </Text>
        </View>
        <View style={[(_e = DEFAULT.Styles.locked) === null || _e === void 0 ? void 0 : _e.content, styles === null || styles === void 0 ? void 0 : styles.content]}>
            {(options === null || options === void 0 ? void 0 : options.lockIcon) || <Text style={[(_f = DEFAULT.Styles.locked) === null || _f === void 0 ? void 0 : _f.lock, styles === null || styles === void 0 ? void 0 : styles.lock]}>{textOptions === null || textOptions === void 0 ? void 0 : textOptions.lockedText}</Text>}
            <Countdown style={styles === null || styles === void 0 ? void 0 : styles.countdown} textStyle={styles === null || styles === void 0 ? void 0 : styles.countdownText} duration={options === null || options === void 0 ? void 0 : options.lockDuration} onFinish={onClockFinish}/>
        </View>
        <View style={[(_g = DEFAULT.Styles.locked) === null || _g === void 0 ? void 0 : _g.footer, styles === null || styles === void 0 ? void 0 : styles.footer]}>
            <Text style={[(_h = DEFAULT.Styles.locked) === null || _h === void 0 ? void 0 : _h.footerText]}>{textOptions === null || textOptions === void 0 ? void 0 : textOptions.footerText}</Text>
        </View>
    </>;
};
export default LockedLayout;
//# sourceMappingURL=LockedLayout.js.map