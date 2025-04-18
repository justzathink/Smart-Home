import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { DEFAULT, millisToMinutesAndSeconds } from '../common';
const Countdown = ({ duration = DEFAULT.Options.lockDuration || 60000, style, textStyle, onFinish }) => {
    var _a, _b;
    const [remaining, setRemaining] = useState(duration);
    useEffect(() => {
        const id = setTimeout(() => {
            if (remaining > 1000) {
                setRemaining(remaining - 1000);
            }
            else {
                onFinish();
            }
        }, 1000);
        return () => clearTimeout(id);
    }, [remaining]);
    return <View style={[(_a = DEFAULT.Styles.locked) === null || _a === void 0 ? void 0 : _a.countdown, style]}>
		<Text style={[(_b = DEFAULT.Styles.locked) === null || _b === void 0 ? void 0 : _b.countdownText, textStyle]}>{millisToMinutesAndSeconds(remaining)}</Text>
	</View>;
};
export default Countdown;
//# sourceMappingURL=Countdown.js.map