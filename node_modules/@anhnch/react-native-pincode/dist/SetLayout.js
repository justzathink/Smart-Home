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
import { Platform, Text, Vibration, View } from "react-native";
import { PinCodeT } from "./types";
import { DEFAULT } from './common';
import NumberButtons from './components/NumbersPanel';
import Pin from './components/Pin';
const SetLayout = ({ pin, styles, mode, textOptions, options, onSwitchMode, onSet, onSetCancel, onReset }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const [curPin, setCurPin] = useState('');
    const [lastPin, setLastPin] = useState('');
    const [status, setStatus] = useState(PinCodeT.Statuses.Initial);
    const [showError, setShowError] = useState(false);
    function onNumberPress(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPin = (value == 'delete') ?
                (curPin.substring(0, curPin.length - 1)) :
                (curPin + value);
            setCurPin(newPin);
            if (newPin.length == (options === null || options === void 0 ? void 0 : options.pinLength)) {
                // STEP 1
                if (status == PinCodeT.Statuses.Initial) {
                    setLastPin(newPin);
                    setStatus(PinCodeT.Statuses.SetOnce);
                    setCurPin('');
                }
                // STEP 2
                else if (status == PinCodeT.Statuses.SetOnce) {
                    if (lastPin == newPin) { // pin matched
                        onSet(newPin);
                    }
                    else { // pin doesn't matched
                        setShowError(true);
                        if (Platform.OS === 'ios') {
                            Vibration.vibrate(); // android requires VIBRATE permission
                        }
                        setTimeout(() => setShowError(false), 3000);
                        setTimeout(() => setCurPin(''), 1500);
                    }
                    setStatus(PinCodeT.Statuses.Initial);
                    setLastPin('');
                }
            }
        });
    }
    function cancel() {
        onSetCancel === null || onSetCancel === void 0 ? void 0 : onSetCancel();
    }
    return <>
        <View style={[(_a = DEFAULT.Styles.enter) === null || _a === void 0 ? void 0 : _a.header, styles === null || styles === void 0 ? void 0 : styles.header]}>
            <Text style={[(_b = DEFAULT.Styles.enter) === null || _b === void 0 ? void 0 : _b.title, styles === null || styles === void 0 ? void 0 : styles.title]}>{mode == PinCodeT.Modes.Enter ? (_c = textOptions.enter) === null || _c === void 0 ? void 0 : _c.title : (_d = textOptions.set) === null || _d === void 0 ? void 0 : _d.title}</Text>
            {status == PinCodeT.Statuses.Initial && <Text style={[(_e = DEFAULT.Styles.enter) === null || _e === void 0 ? void 0 : _e.subTitle, styles === null || styles === void 0 ? void 0 : styles.subTitle]}>
                {(_g = (_f = textOptions.set) === null || _f === void 0 ? void 0 : _f.subTitle) === null || _g === void 0 ? void 0 : _g.replace('{{pinLength}}', ((options === null || options === void 0 ? void 0 : options.pinLength) || DEFAULT.Options.pinLength || 4).toString())}</Text>}
            {status == PinCodeT.Statuses.SetOnce && <Text style={[(_h = DEFAULT.Styles.enter) === null || _h === void 0 ? void 0 : _h.subTitle, styles === null || styles === void 0 ? void 0 : styles.subTitle]}>{(_j = textOptions.set) === null || _j === void 0 ? void 0 : _j.repeat}</Text>}
            {showError && <Text style={[(_k = DEFAULT.Styles.enter) === null || _k === void 0 ? void 0 : _k.errorText, styles === null || styles === void 0 ? void 0 : styles.errorText]}>{(_l = textOptions.set) === null || _l === void 0 ? void 0 : _l.error}</Text>}
        </View>
        <View style={[(_m = DEFAULT.Styles.enter) === null || _m === void 0 ? void 0 : _m.content, styles === null || styles === void 0 ? void 0 : styles.content]}>
            <Pin pin={curPin} pinLength={(options === null || options === void 0 ? void 0 : options.pinLength) || DEFAULT.Options.pinLength || 4} style={styles === null || styles === void 0 ? void 0 : styles.pinContainer} pinStyle={[(_o = DEFAULT.Styles.set) === null || _o === void 0 ? void 0 : _o.pin, styles === null || styles === void 0 ? void 0 : styles.pin]} enteredPinStyle={[(_p = DEFAULT.Styles.set) === null || _p === void 0 ? void 0 : _p.enteredPin, styles === null || styles === void 0 ? void 0 : styles.enteredPin]}/>

            <NumberButtons onButtonPress={onNumberPress} backSpace={options === null || options === void 0 ? void 0 : options.backSpace} backSpaceText={(_q = textOptions.enter) === null || _q === void 0 ? void 0 : _q.backSpace} buttonStyle={styles === null || styles === void 0 ? void 0 : styles.button} rowStyle={styles === null || styles === void 0 ? void 0 : styles.buttonRow} style={styles === null || styles === void 0 ? void 0 : styles.buttonContainer} textStyle={styles === null || styles === void 0 ? void 0 : styles.buttonText}/>
        </View>
        <View style={[(_r = DEFAULT.Styles.enter) === null || _r === void 0 ? void 0 : _r.footer, styles === null || styles === void 0 ? void 0 : styles.footer]}>
            <Text onPress={cancel} style={[(_s = DEFAULT.Styles.set) === null || _s === void 0 ? void 0 : _s.footerText, styles === null || styles === void 0 ? void 0 : styles.footerText]}>{(_t = textOptions.set) === null || _t === void 0 ? void 0 : _t.cancel}</Text>
        </View>
    </>;
};
export default SetLayout;
//# sourceMappingURL=SetLayout.js.map