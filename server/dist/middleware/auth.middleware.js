"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jws_utils_1 = require("../utils/jws.utils");
const AuthTokenInvalid_error_1 = require("../errors/AuthTokenInvalid.error");
const AuthTokenMissing_error_1 = require("../errors/AuthTokenMissing.error");
const cookie_1 = require("../utils/cookie");
function authMiddleware(req, _res, next) {
    const token = req.cookies?.[cookie_1.AUTH_COOKIE_NAME];
    if (!token) {
        throw new AuthTokenMissing_error_1.AuthTokenMissingError();
    }
    try {
        const payload = (0, jws_utils_1.verifyToken)(token);
        req.userId = payload.userId;
        next();
    }
    catch {
        throw new AuthTokenInvalid_error_1.AuthTokenInvalidError();
    }
}
