import React from 'react';
import { PinCodeT } from "./types";
declare const SetLayout: ({ pin, styles, mode, textOptions, options, onSwitchMode, onSet, onSetCancel, onReset }: {
    pin: string | undefined;
    styles?: PinCodeT.EnterSetStyles | undefined;
    mode: PinCodeT.Modes;
    textOptions: PinCodeT.TextOptions;
    options?: PinCodeT.Options | undefined;
    onSwitchMode?: (() => void) | undefined;
    onSetCancel?: (() => void) | undefined;
    onSet: (newPin: string) => void;
    onReset: () => void;
}) => React.JSX.Element;
export default SetLayout;
