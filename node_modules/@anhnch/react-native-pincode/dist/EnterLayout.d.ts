import React from 'react';
import { PinCodeT } from "./types";
declare const EnterLayout: ({ pin, styles, mode, textOptions, options, onSwitchMode, onEnter, onReset, onMaxAttempt }: {
    pin: string | undefined;
    styles?: PinCodeT.EnterStyles | undefined;
    mode: PinCodeT.Modes;
    textOptions: PinCodeT.TextOptions;
    options?: PinCodeT.Options | undefined;
    onSwitchMode?: (() => void) | undefined;
    onEnter: (newPin: string) => void;
    onMaxAttempt: () => void;
    onReset: () => void;
}) => React.JSX.Element;
export default EnterLayout;
