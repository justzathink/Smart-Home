export var PinCodeT;
(function (PinCodeT) {
    let Modes;
    (function (Modes) {
        /**
         * When the user is asked to enter the pin to access the secured content
         */
        Modes["Enter"] = "enter";
        /**
         * When the user is asked to set the pin for the secured content
         */
        Modes["Set"] = "set";
        /**
         * When the screen is locked due to exceeding the maxAttempt
         * @see maxAtempt
         */
        Modes["Locked"] = "locked";
        /**
         * When the user forgot the pin and want to reset it
         */
        Modes["Reset"] = "reset";
    })(Modes = PinCodeT.Modes || (PinCodeT.Modes = {}));
    let Statuses;
    (function (Statuses) {
        Statuses["Initial"] = "initial";
        Statuses["SetOnce"] = "set.once";
        Statuses["ResetPrompted"] = "reset.prompted";
        Statuses["ResetSucceeded"] = "reset.succeeded";
    })(Statuses = PinCodeT.Statuses || (PinCodeT.Statuses = {}));
})(PinCodeT || (PinCodeT = {}));
//# sourceMappingURL=types.js.map