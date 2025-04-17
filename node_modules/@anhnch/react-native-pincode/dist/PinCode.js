import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PinCodeT } from './types';
import ResetLayout from './ResetLayout';
import LockedLayout from './LockedLayout';
import EnterLayout from './EnterLayout';
import { DEFAULT } from './common';
import SetLayout from './SetLayout';
const PinCode = ({ pin, visible = false, mode = PinCodeT.Modes.Enter, options, textOptions, styles, onEnter, onSet, onSetCancel, onReset, onModeChanged }) => {
    const [curMode, setCurMode] = useState(mode);
    const [curOptions, setCurOptions] = useState(DEFAULT.Options);
    const [curTextOptions, setCurTextOptions] = useState(DEFAULT.TextOptions);
    useEffect(() => {
        setCurOptions(Object.assign(Object.assign({}, DEFAULT.Options), options));
    }, [options]);
    useEffect(() => {
        if (!textOptions)
            return;
        const merged = {
            enter: Object.assign(Object.assign({}, DEFAULT.TextOptions.enter), textOptions.enter),
            set: Object.assign(Object.assign({}, DEFAULT.TextOptions.set), textOptions.set),
            locked: Object.assign(Object.assign({}, DEFAULT.TextOptions.locked), textOptions.locked),
            reset: Object.assign(Object.assign({}, DEFAULT.TextOptions.reset), textOptions.reset)
        };
        setCurTextOptions(merged);
    }, [textOptions]);
    useEffect(() => {
        setCurMode(mode);
    }, [mode]);
    function switchMode(newMode) {
        setCurMode(newMode);
        onModeChanged === null || onModeChanged === void 0 ? void 0 : onModeChanged(curMode, newMode);
    }
    if (!visible)
        return null;
    return <View style={[DEFAULT.Styles.main, styles === null || styles === void 0 ? void 0 : styles.main]}>
        {(curMode == PinCodeT.Modes.Enter) &&
            <EnterLayout pin={pin} mode={curMode} options={curOptions} textOptions={curTextOptions} onEnter={onEnter} onMaxAttempt={() => switchMode(PinCodeT.Modes.Locked)} onReset={() => switchMode(PinCodeT.Modes.Reset)} styles={styles === null || styles === void 0 ? void 0 : styles.enter}/>}
        {(curMode == PinCodeT.Modes.Set) &&
            <SetLayout pin={pin} mode={curMode} options={curOptions} textOptions={curTextOptions} onSet={onSet} onReset={() => switchMode(PinCodeT.Modes.Reset)} onSetCancel={onSetCancel} styles={styles === null || styles === void 0 ? void 0 : styles.enter}/>}
        {(curMode == PinCodeT.Modes.Locked) &&
            <LockedLayout options={curOptions} textOptions={curTextOptions.locked} styles={styles === null || styles === void 0 ? void 0 : styles.locked} onClockFinish={() => switchMode(PinCodeT.Modes.Enter)}/>}
        {(curMode == PinCodeT.Modes.Reset) &&
            <ResetLayout styles={styles === null || styles === void 0 ? void 0 : styles.reset} textOptions={curTextOptions.reset} options={curOptions} onReset={onReset} onCancel={() => switchMode(PinCodeT.Modes.Enter)}/>}
    </View>;
};
export default PinCode;
//# sourceMappingURL=PinCode.js.map