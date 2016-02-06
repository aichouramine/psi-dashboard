(function (AuthType) {
    AuthType[AuthType["TWITTER"] = 0] = "TWITTER";
    AuthType[AuthType["GITHUB"] = 1] = "GITHUB";
})(exports.AuthType || (exports.AuthType = {}));
var AuthType = exports.AuthType;
;
(function (NotificationPermission) {
    NotificationPermission[NotificationPermission["GRANTED"] = 0] = "GRANTED";
    NotificationPermission[NotificationPermission["DENIED"] = 1] = "DENIED";
    NotificationPermission[NotificationPermission["UNSUPPORTED"] = 2] = "UNSUPPORTED";
})(exports.NotificationPermission || (exports.NotificationPermission = {}));
var NotificationPermission = exports.NotificationPermission;
;
;
