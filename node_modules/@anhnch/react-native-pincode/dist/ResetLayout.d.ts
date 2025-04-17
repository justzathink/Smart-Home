import React from "react";
import { PinCodeT } from "./types";
declare const ResetLayout: ({ styles, textOptions, options, onReset, onCancel }: {
    styles?: PinCodeT.ResetStyles | undefined;
    options: PinCodeT.Options;
    textOptions?: PinCodeT.ResetTextOptions | undefined;
    onReset?: (() => void) | undefined;
    onCancel: () => void;
}) => React.JSX.Element;
export default ResetLayout;
