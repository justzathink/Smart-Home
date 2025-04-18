import React from 'react';
import { PinCodeT } from "./types";
declare const LockedLayout: ({ styles, options, textOptions, onClockFinish }: {
    styles?: PinCodeT.LockedStyles | undefined;
    textOptions?: PinCodeT.LockedTextOptions | undefined;
    options?: PinCodeT.Options | undefined;
    onClockFinish: () => void;
}) => React.JSX.Element;
export default LockedLayout;
