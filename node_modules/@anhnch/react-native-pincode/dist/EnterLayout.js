var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import { Platform, Pressable, Text, Vibration, View } from "react-native";
import { DEFAULT } from './common';
import NumbersPanel from './components/NumbersPanel';
import Pin from './components/Pin';
const EnterLayout = ({ pin, styles, mode, textOptions, options, onSwitchMode, onEnter, onReset, onMaxAttempt }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const [curPin, setCurPin] = useState('');
    const [disabled, disableButtons] = useState(false);
    const [failureCount, setFailureCount] = useState(0);
    const [showError, setShowError] = useState(false);
    function onNumberPress(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPin = (value == 'delete') ?
                (curPin.substring(0, curPin.length - 1)) :
                (curPin + value);
            setCurPin(newPin);
            if (newPin.length == (options === null || options === void 0 ? void 0 : options.pinLength)) {
                yield processEnterPin(newPin);
            }
        });
    }
    function processEnterPin(enteredPin) {
        return __awaiter(this, void 0, void 0, function* () {
            disableButtons(true);
            if (pin === enteredPin) {
                setFailureCount(0);
                disableButtons(false);
                onEnter(enteredPin);
                return;
            }
            if (!(options === null || options === void 0 ? void 0 : options.disableLock) && failureCount >= ((options === null || options === void 0 ? void 0 : options.maxAttempt) || DEFAULT.Options.maxAttempt || 5) - 1) {
                disableButtons(false);
                onMaxAttempt();
                return;
            }
            setCurPin('');
            setFailureCount(failureCount + 1);
            if (Platform.OS === 'ios') {
                Vibration.vibrate(); // android requires VIBRATE permission
            }
            setShowError(true);
            setTimeout(() => setShowError(false), (options === null || options === void 0 ? void 0 : options.retryLockDuration) || DEFAULT.Options.retryLockDuration);
            setTimeout(() => disableButtons(false), (options === null || options === void 0 ? void 0 : options.retryLockDuration) || DEFAULT.Options.retryLockDuration);
        });
    }
    return <>
        <View style={[(_a = DEFAULT.Styles.enter) === null || _a === void 0 ? void 0 : _a.header, styles === null || styles === void 0 ? void 0 : styles.header]}>
            <Text style={[(_b = DEFAULT.Styles.enter) === null || _b === void 0 ? void 0 : _b.title, styles === null || styles === void 0 ? void 0 : styles.title]}>{((_c = textOptions.enter) === null || _c === void 0 ? void 0 : _c.title) || ((_d = DEFAULT.TextOptions.enter) === null || _d === void 0 ? void 0 : _d.title)}</Text>

            <Text style={[(_e = DEFAULT.Styles.enter) === null || _e === void 0 ? void 0 : _e.subTitle, styles === null || styles === void 0 ? void 0 : styles.subTitle]}>
                {(_g = (_f = textOptions.enter) === null || _f === void 0 ? void 0 : _f.subTitle) === null || _g === void 0 ? void 0 : _g.replace('{{pinLength}}', ((options === null || options === void 0 ? void 0 : options.pinLength) || DEFAULT.Options.pinLength || 4).toString())}
            </Text>
            {showError && <Text style={[(_h = DEFAULT.Styles.enter) === null || _h === void 0 ? void 0 : _h.errorText, styles === null || styles === void 0 ? void 0 : styles.errorText]}>{((_j = textOptions.enter) === null || _j === void 0 ? void 0 : _j.error) || ((_k = DEFAULT.TextOptions.enter) === null || _k === void 0 ? void 0 : _k.error)}</Text>}
        </View>
        <View style={[(_l = DEFAULT.Styles.enter) === null || _l === void 0 ? void 0 : _l.content, styles === null || styles === void 0 ? void 0 : styles.content]}>
            <Pin pin={curPin} pinLength={(options === null || options === void 0 ? void 0 : options.pinLength) || DEFAULT.Options.pinLength || 4} style={styles === null || styles === void 0 ? void 0 : styles.pinContainer} pinStyle={[(_m = DEFAULT.Styles.enter) === null || _m === void 0 ? void 0 : _m.pin, styles === null || styles === void 0 ? void 0 : styles.pin]} enteredPinStyle={[(_o = DEFAULT.Styles.enter) === null || _o === void 0 ? void 0 : _o.enteredPin, styles === null || styles === void 0 ? void 0 : styles.enteredPin]}/>

            <NumbersPanel disabled={disabled} onButtonPress={onNumberPress} backSpace={options === null || options === void 0 ? void 0 : options.backSpace} backSpaceText={(_p = textOptions.enter) === null || _p === void 0 ? void 0 : _p.backSpace} buttonStyle={styles === null || styles === void 0 ? void 0 : styles.button} rowStyle={styles === null || styles === void 0 ? void 0 : styles.buttonRow} style={styles === null || styles === void 0 ? void 0 : styles.buttonContainer} textStyle={styles === null || styles === void 0 ? void 0 : styles.buttonText} disabledStyle={styles === null || styles === void 0 ? void 0 : styles.buttonTextDisabled}/>
        </View>
        <View style={[(_q = DEFAULT.Styles.enter) === null || _q === void 0 ? void 0 : _q.footer, styles === null || styles === void 0 ? void 0 : styles.footer]}>
            {(options === null || options === void 0 ? void 0 : options.allowReset) && <Pressable onPress={onReset} style={state => ({ opacity: state.pressed ? 0.6 : 1 })}>
                <Text style={[(_r = DEFAULT.Styles.enter) === null || _r === void 0 ? void 0 : _r.footerText, styles === null || styles === void 0 ? void 0 : styles.footerText]}>{((_s = textOptions.enter) === null || _s === void 0 ? void 0 : _s.footerText) || ((_t = DEFAULT.TextOptions.enter) === null || _t === void 0 ? void 0 : _t.footerText)}</Text>
            </Pressable>}
        </View>
    </>;
};
export default EnterLayout;
//# sourceMappingURL=EnterLayout.js.map